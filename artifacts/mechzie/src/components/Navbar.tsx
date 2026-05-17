import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

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
          <div className="text-2xl font-extrabold tracking-tight cursor-pointer">
            Mech<span className="text-primary">Zie</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
          <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
          <a href="#why-us" className="text-foreground hover:text-primary transition-colors">Why Us</a>
          <a href="#app" className="text-foreground hover:text-primary transition-colors">App</a>
        </div>

        <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_4px_12px_-2px_rgba(232,117,26,0.3)] hover:shadow-[0_6px_16px_-2px_rgba(232,117,26,0.4)] hover:-translate-y-0.5">
          Download App
        </button>
      </div>
    </motion.nav>
  );
}
