import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LINKS, scrollToAnchor } from "@/lib/links";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-background">
      {/* One deliberate warm glow — the page's single ambient effect. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6"
            >
              Your Bike Breaks. <br />
              <span className="text-primary">
                MechZie Arrives.
              </span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Fast doorstep bike repair and emergency mechanic support anytime, anywhere. 
              The confidence of a pit crew, right in your pocket.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                data-testid="hero-cta-book"
                href={LINKS.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg transition-all hover:bg-primary/90 hover:-translate-y-1 shadow-[0_4px_12px_-2px_rgba(232,117,26,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(232,117,26,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Book Mechanic
              </a>
              <button
                data-testid="hero-cta-explore"
                onClick={() => scrollToAnchor(LINKS.anchors.services)}
                className="w-full sm:w-auto px-8 py-4 border-2 border-primary/20 text-foreground rounded-full font-bold text-lg transition-all hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Explore Services
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
          >
            {/* Abstract geometric mechanic illustration */}
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full transform -rotate-12 blur-2xl" />
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E8751A" />
                    <stop offset="100%" stopColor="#F09840" />
                  </linearGradient>
                </defs>
                <circle cx="200" cy="200" r="180" fill="url(#primary-grad)" opacity="0.1" />
                <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="8 8" />
                <path d="M100 280 L180 200 L180 120 L240 120 L240 180 L300 240 L260 280 L200 220 L140 280 Z" fill="currentColor" opacity="0.05" />
                
                {/* Stylized Motorcycle Outline */}
                <g stroke="url(#primary-grad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <circle cx="120" cy="260" r="40" />
                  <circle cx="280" cy="260" r="40" />
                  <path d="M120 260 L180 180 L260 180 L280 260" />
                  <path d="M180 180 L150 140 L180 130" />
                  <path d="M260 180 L220 180" />
                </g>
                
                {/* Mechanic Elements */}
                <path d="M220 140 L260 100 M240 160 L280 120" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-foreground dark:text-white" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
