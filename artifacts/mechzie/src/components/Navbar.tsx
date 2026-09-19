import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LINKS, scrollToAnchor } from "@/lib/links";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV_LINKS: { label: string; anchor: string }[] = [
  { label: "Services", anchor: LINKS.anchors.services },
  { label: "How It Works", anchor: LINKS.anchors.howItWorks },
  { label: "Why Us", anchor: LINKS.anchors.whyUs },
  { label: "App", anchor: LINKS.anchors.app },
];

function openPlayStore() {
  window.open(LINKS.playStore, "_blank", "noopener,noreferrer");
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-border shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight cursor-pointer">
            <Logo size={32} className="text-primary" />
            <span>Mech<span className="text-primary">Zie</span></span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((l) => (
            <button
              key={l.anchor}
              onClick={() => scrollToAnchor(l.anchor)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openPlayStore}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_4px_12px_-2px_rgba(232,117,26,0.3)] hover:shadow-[0_6px_16px_-2px_rgba(232,117,26,0.4)] hover:-translate-y-0.5"
          >
            Download App
          </button>

          {/* Mobile nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight mt-2 mb-8">
                <Logo size={26} className="text-primary" />
                <span>Mech<span className="text-primary">Zie</span></span>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <SheetClose asChild key={l.anchor}>
                    <button
                      onClick={() => scrollToAnchor(l.anchor)}
                      className="text-left px-3 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      {l.label}
                    </button>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <button
                  onClick={openPlayStore}
                  className="mt-8 w-full bg-primary text-primary-foreground px-5 py-3.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Download App
                </button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
