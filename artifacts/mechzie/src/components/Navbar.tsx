import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { PiList, PiX } from "react-icons/pi";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LINKS, scrollToAnchor } from "@/lib/links";

const NAV_LINKS: { label: string; anchor: string }[] = [
  { label: "Services", anchor: LINKS.anchors.services },
  { label: "How It Works", anchor: LINKS.anchors.howItWorks },
  { label: "Why MechZie", anchor: LINKS.anchors.whyUs },
  { label: "App", anchor: LINKS.anchors.app },
];

function openPlayStore() {
  window.open(LINKS.playStore, "_blank", "noopener,noreferrer");
}

export function Navbar() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // track manual click so observer doesn't immediately override it
  const clickedRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scrolled background ──────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Scroll-spy via IntersectionObserver ──────────────────────────────────
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.anchor);

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if user just manually clicked a nav item (give scroll time to settle)
        if (clickedRef.current) return;

        // Pick the topmost intersecting section
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          setActiveLink(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Mobile body scroll lock ──────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function handleNavClick(anchor: string) {
    setActiveLink(anchor);
    scrollToAnchor(anchor);
    // Suppress observer for 800ms so it doesn't override the click immediately
    if (clickedRef.current) clearTimeout(clickedRef.current);
    clickedRef.current = setTimeout(() => { clickedRef.current = null; }, 800);
  }

  return (
    <>
      {/* ── Top bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-300"
        style={
          scrolled
            ? {
                background: "hsl(var(--background) / 0.88)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid hsl(var(--border) / 0.5)",
              }
            : undefined
        }
      >
        {/* Logo — left */}
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <Logo size={26} className="text-primary" />
            <span
              className="text-[1rem] font-bold text-foreground"
              style={{ fontFamily: "var(--app-font-sans)", letterSpacing: "0.02em" }}
            >
              Mech<span className="text-primary">Zie</span>
            </span>
          </div>
        </Link>

        {/* ── Center — glass pill nav ── */}
        <nav
          className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
          style={{
            background: "hsl(var(--card) / 0.55)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid hsl(var(--border) / 0.6)",
            boxShadow: "0 4px 24px -4px rgba(0,0,0,0.25), inset 0 1px 0 hsl(var(--foreground) / 0.04)",
          }}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((l) => {
            const isActive = activeLink === l.anchor;
            return (
              <button
                key={l.anchor}
                onClick={() => handleNavClick(l.anchor)}
                className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                style={{
                  color: isActive
                    ? "hsl(var(--foreground))"
                    : "hsl(var(--muted-foreground))",
                }}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      boxShadow: "0 2px 8px -2px rgba(0,0,0,0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right — theme toggle + CTA + hamburger */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {/* Glass CTA */}
          <button
            onClick={openPlayStore}
            className="hidden md:inline-flex btn-primary px-5 py-2 text-sm"
          >
            Get the App
          </button>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
            style={{
              background: "hsl(var(--card) / 0.55)",
              backdropFilter: "blur(12px)",
              border: "1px solid hsl(var(--border) / 0.6)",
            }}
          >
            {mobileOpen ? <PiX size={18} /> : <PiList size={18} />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-30 flex flex-col pt-24 px-6 pb-8"
            style={{
              background: "hsl(var(--background) / 0.97)",
              backdropFilter: "blur(16px)",
            }}
          >
            <nav className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.anchor}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: "easeOut" }}
                  onClick={() => { handleNavClick(l.anchor); setMobileOpen(false); }}
                  className="text-left text-3xl text-foreground/80 hover:text-primary py-4 border-b border-border transition-colors"
                  style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.06em" }}
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              onClick={openPlayStore}
              className="btn-primary w-full py-4 text-base mt-4"
            >
              Get the App
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
