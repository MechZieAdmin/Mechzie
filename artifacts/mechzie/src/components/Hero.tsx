import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LINKS, scrollToAnchor } from "@/lib/links";
import { PiCaretDown, PiCheckCircle, PiWrench } from "react-icons/pi";

/* ─────────────────────────────────────────────────────────────────────────
   RouteScene — comet-tail animation
   • Full ghost dashed line always shown (context for the route)
   • A glowing "tail" segment (30% of path) slides along, ending at mechanic icon
   • Area AHEAD of icon = only ghost; BEHIND = nothing; AT icon = glowing tail
   • Mechanic wrench icon loops top → pin continuously
   ───────────────────────────────────────────────────────────────────────── */

const PATH_D = "M 150 28 C 175 75, 55 90, 80 140 C 105 190, 48 200, 100 240";

function RouteScene() {
  // Invisible geometry reference path — never rendered with stroke
  const measureRef = useRef<SVGPathElement>(null);
  // The glowing comet-tail stroke path
  const tailRef = useRef<SVGPathElement>(null);
  // Mechanic icon position driven by RAF
  const [mechPos, setMechPos] = useState<{ x: number; y: number }>({ x: 150, y: 28 });
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const LOOP_MS = 3400;
  const TAIL_FRAC = 0.30; // 30% of path length glows behind icon

  useEffect(() => {
    const measure = measureRef.current;
    const tail = tailRef.current;
    if (!measure || !tail) return;

    const L = measure.getTotalLength();
    const tailLen = L * TAIL_FRAC;

    // The dasharray trick:
    // dasharray = [tailLen, L] → only tailLen worth of stroke is ever painted
    // dashoffset slides from 0..L, positioning the visible segment end at the icon
    tail.style.strokeDasharray = `${tailLen} ${L}`;
    tail.style.strokeDashoffset = `${L}`; // fully hidden at start

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const t = ((ts - startRef.current) % LOOP_MS) / LOOP_MS; // 0 → 1 per loop

      // Icon follows path
      const pt = measure.getPointAtLength(L * t);
      setMechPos({ x: pt.x, y: pt.y });

      // Slide tail so its END aligns with icon at progress t:
      // offset = L - t×L  →  when t=0, offset=L (hidden); t=1, offset=0 (at end)
      tail.style.strokeDashoffset = String(L - t * L);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="relative select-none" style={{ width: 220, height: 280 }} aria-hidden="true">
      <svg viewBox="0 0 220 280" width={220} height={280} className="absolute inset-0" overflow="visible">
        <defs>
          {/* Neon glow on tail */}
          <filter id="tailGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Stronger glow for destination pin */}
          <filter id="pinGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Invisible measure path (geometry only, never painted) ── */}
        <path ref={measureRef} d={PATH_D} fill="none" stroke="none" />

        {/* ── 1. Full ghost route — faint dashed context line ── */}
        <path
          d={PATH_D}
          fill="none"
          stroke="hsl(26 88% 52% / 0.16)"
          strokeWidth="2"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />

        {/* ── 2. Comet tail — glowing segment sliding along, end = mechanic ── */}
        <path
          ref={tailRef}
          d={PATH_D}
          fill="none"
          stroke="hsl(26 88% 52%)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#tailGlow)"
        />

        {/* ── Destination pin rings (animated) ── */}
        <motion.circle
          cx="100" cy="240" r="14"
          fill="none"
          stroke="hsl(26 88% 52% / 0.5)"
          strokeWidth="1.5"
          animate={{ r: [14, 32], opacity: [0.55, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          cx="100" cy="240" r="14"
          fill="none"
          stroke="hsl(26 88% 52% / 0.3)"
          strokeWidth="1"
          animate={{ r: [14, 40], opacity: [0.3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.75 }}
        />
        {/* Pin circle */}
        <circle cx="100" cy="240" r="13" fill="hsl(26 88% 52%)" filter="url(#pinGlow)" />
        {/* Pin icon — inline location dot */}
        <g transform="translate(93.5, 233.5)">
          <path
            d="M6.5 0C3.99 0 2 2 2 4.5c0 3.38 4.5 8 4.5 8s4.5-4.62 4.5-8C11 2 9.01 0 6.5 0zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            fill="white"
          />
        </g>
      </svg>

      {/* ── Mechanic icon — position driven by RAF ── */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: mechPos.x,
          top: mechPos.y,
          transform: "translate(-50%, -50%)",
          willChange: "left, top",
        }}
      >
        {/* Soft glow halo */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "-10px",
            background: "hsl(26 88% 52% / 0.22)",
            filter: "blur(10px)",
          }}
        />
        {/* Icon circle */}
        <div className="relative w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_20px_hsl(26_88%_52%/0.75)]">
          <PiWrench size={17} className="text-primary" />
        </div>
        {/* "Mechanic" label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span
            className="text-[9px] font-black uppercase tracking-[0.1em] text-primary"
            style={{ textShadow: "0 0 8px hsl(26 88% 52% / 0.55)" }}
          >
            Mechanic
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DispatchCard
   ───────────────────────────────────────────────────────────────────────── */
function DispatchCard() {
  const steps = [
    { label: "Request sent", done: true },
    { label: "Mechanic matched", done: true },
    { label: "Mechanic · 12 min", done: false, active: true },
  ];

  return (
    <div className="dispatch-card p-5 w-full max-w-[310px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.1em] mb-0.5">
            Job #MZ-2847
          </p>
          <p className="text-sm font-semibold text-foreground">Flat Tyre · NH-16</p>
        </div>
        <span className="pill-tag text-[11px]">
          <span className="live-dot shrink-0" />
          Live
        </span>
      </div>

      <div className="space-y-2.5">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                s.done
                  ? "bg-primary text-white"
                  : s.active
                  ? "border-2 border-primary text-primary"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {s.done ? "✓" : i + 1}
            </span>
            <span
              className={`text-sm ${
                s.active
                  ? "text-foreground font-semibold"
                  : s.done
                  ? "text-muted-foreground line-through"
                  : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            {s.active && (
              <motion.span
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="ml-auto text-[10px] font-bold text-primary"
              >
                ●
              </motion.span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-card border border-primary/30 flex items-center justify-center text-xs font-bold text-primary shrink-0">
          RK
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Ravi Kumar</p>
          <p className="text-xs text-muted-foreground">Verified · YAMAHA specialist</p>
        </div>
        <div className="ml-auto text-xs font-bold text-primary">4.9 ★</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────────────────────────────────── */
export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.11, delayChildren: 0.1 },
    },
  };

  const lineVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      {/* Background glows */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle at 70% 20%, hsl(26 88% 52% / 0.09) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle at 20% 80%, hsl(220 60% 30% / 0.06) 0%, transparent 65%)" }}
      />

      <div className="container mx-auto px-6 relative z-10 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left — headline */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={lineVariants} className="flex justify-center lg:justify-start mb-7">
              <span className="pill-tag">
                <span className="live-dot shrink-0" />
                On-Demand across India
              </span>
            </motion.div>

            <div className="overflow-hidden mb-1">
              <motion.h1
                variants={lineVariants}
                className="text-[clamp(4rem,10.5vw,8rem)] leading-[0.92] text-foreground"
                style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.06em" }}
              >
                Your Bike
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.div
                variants={lineVariants}
                className="text-[clamp(4rem,10.5vw,8rem)] leading-[0.92] text-primary"
                style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.06em" }}
              >
                Breaks.
              </motion.div>
            </div>
            <div className="overflow-hidden mb-9">
              <motion.div
                variants={lineVariants}
                className="text-[clamp(4rem,10.5vw,8rem)] leading-[0.92] text-foreground"
                style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.06em" }}
              >
                MechZie Arrives.
              </motion.div>
            </div>

            <motion.p
              variants={lineVariants}
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              A verified mechanic dispatched to your location. Live tracking,
              in-app call, and digital payment — the complete rescue in your pocket.
            </motion.p>

            <motion.div
              variants={lineVariants}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a
                data-testid="hero-cta-book"
                href={LINKS.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto px-8 py-3.5 text-base"
              >
                Get the App
              </a>
              <button
                data-testid="hero-cta-explore"
                onClick={() => scrollToAnchor(LINKS.anchors.services)}
                className="btn-ghost w-full sm:w-auto px-8 py-3.5 text-base"
              >
                See Services
              </button>
            </motion.div>

            <motion.div
              variants={lineVariants}
              className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start"
            >
              {["Document-verified mechanics", "Razorpay payment", "Firebase OTP"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <PiCheckCircle size={13} className="text-primary shrink-0" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — animated route scene + dispatch card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="flex-1 flex flex-col items-center gap-4 w-full max-w-sm lg:max-w-none"
          >
            <RouteScene />
            <DispatchCard />
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        aria-hidden="true"
      >
        <PiCaretDown size={24} />
      </motion.div>
    </section>
  );
}
