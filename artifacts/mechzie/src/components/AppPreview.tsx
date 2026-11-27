import { motion } from "framer-motion";
import {
  PiDeviceMobile,
  PiCheckCircle,
  PiNavigationArrow,
  PiChatCircle,
} from "react-icons/pi";
import { LINKS } from "@/lib/links";
import { FadeSlideIn } from "@/components/ui/card-animations";

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[240px] h-[480px]">
      {/* Phone frame */}
      <div className="absolute inset-0 bg-[hsl(220_16%_5%)] rounded-[32px] border border-[hsl(220_12%_22%)] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)]" />

      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[hsl(220_16%_3%)] rounded-full z-10" />

      {/* Screen */}
      <div className="absolute inset-2.5 rounded-[26px] bg-[hsl(220_16%_8%)] overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-5 pb-2">
          <span className="text-[10px] text-muted-foreground font-medium">9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2 rounded-sm bg-primary/40" />
            <div className="w-1 h-2 rounded-sm bg-foreground/25" />
          </div>
        </div>

        {/* Header */}
        <div className="px-4 pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground">Job #MZ-2847</p>
              <p className="text-sm font-semibold text-foreground">Mechanic En Route</p>
            </div>
            <span className="pill-tag text-[9px] px-2 py-1">
              <span className="live-dot w-1.5 h-1.5 shrink-0" />
              Live
            </span>
          </div>
        </div>

        {/* Map area */}
        <div className="flex-1 relative bg-[hsl(220_16%_7%)] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(hsl(0 0% 60%) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <svg viewBox="0 0 120 140" className="w-full max-w-[160px] relative z-10">
            <path d="M 20 120 Q 50 60 95 25" fill="none" stroke="hsl(220 12% 28%)" strokeWidth="3" strokeDasharray="5 4" strokeLinecap="round" />
            <path d="M 20 120 Q 50 60 95 25" fill="none" stroke="hsl(26 88% 52%)" strokeWidth="3" strokeLinecap="round" strokeDasharray="60 80" />
            <circle cx="20" cy="120" r="6" fill="hsl(26 88% 52%)" />
            <circle cx="20" cy="120" r="11" fill="hsl(26 88% 52% / 0.2)" />
            <circle cx="68" cy="68" r="5" fill="hsl(142 71% 45%)" />
            <circle cx="68" cy="68" r="9" fill="hsl(142 71% 45% / 0.25)" />
            <rect x="72" y="55" width="40" height="18" rx="4" fill="hsl(220 16% 13%)" stroke="hsl(220 12% 22%)" strokeWidth="0.75" />
            <text x="92" y="67" textAnchor="middle" fill="hsl(0 0% 88%)" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif">12 min</text>
          </svg>
        </div>

        {/* Bottom drawer */}
        <div className="bg-[hsl(220_16%_9%)] border-t border-border p-4">
          <div className="w-8 h-0.5 bg-border rounded-full mx-auto mb-4" />
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full border border-primary/30 bg-card flex items-center justify-center text-xs font-bold text-primary shrink-0">
              RK
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-snug">Ravi Kumar</p>
              <p className="text-[10px] text-muted-foreground">Verified · Yamaha · ★ 4.9</p>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center" aria-label="Track">
                <PiNavigationArrow size={13} />
              </button>
              <button className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center" aria-label="Chat">
                <PiChatCircle size={13} />
              </button>
            </div>
          </div>

          <a
            href={LINKS.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-primary text-white rounded-md text-xs font-semibold"
          >
            <PiCheckCircle size={13} />
            Track in App
          </a>
        </div>
      </div>
    </div>
  );
}

export function AppPreview() {
  return (
    <section id="app" className="py-28 bg-[hsl(var(--secondary))] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      {/* Centered glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, hsl(26 88% 52% / 0.07) 0%, transparent 65%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex justify-center"
          >
            <div className="float">
              <PhoneMockup />
            </div>
          </motion.div>

          {/* Copy */}
          <div className="flex-1">
            <FadeSlideIn>
              <span className="section-divider mb-5" />
            </FadeSlideIn>
            <FadeSlideIn delay={0.06}>
              <h2
                className="text-[clamp(2.6rem,6vw,4.2rem)] leading-none text-foreground mb-5"
                style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.06em" }}
              >
                The Rescue, Live in Your Hand
              </h2>
            </FadeSlideIn>
            <FadeSlideIn delay={0.12}>
              <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md">
                Watch your mechanic approach in real time. Talk to them the moment
                they accept — audio call and chat built in, no number sharing.
                Pay in-app when the job is done.
              </p>
            </FadeSlideIn>

            <FadeSlideIn delay={0.17}>
              <div className="space-y-3 mb-10">
                {[
                  "Live mechanic tracking with ETA",
                  "In-app audio call and chat",
                  "Razorpay payment — itemized bill",
                  "Two-sided ratings after every job",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <PiCheckCircle size={16} className="text-primary shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>
            </FadeSlideIn>

            <FadeSlideIn delay={0.22}>
              <a
                href={LINKS.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex gap-2.5 px-7 py-3.5 text-base"
              >
                <PiDeviceMobile size={18} />
                Download on Google Play
              </a>
            </FadeSlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}
