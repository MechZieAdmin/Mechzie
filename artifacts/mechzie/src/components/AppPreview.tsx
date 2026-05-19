import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Smartphone, Download, CheckCircle2 } from "lucide-react";

export function AppPreview() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 based on screen size
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="app" className="py-32 bg-secondary overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            See MechZie in Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            A seamlessly designed app experience to get you help instantly. No friction, just results.
          </motion.p>
        </div>

        <div className="relative flex justify-center items-center">
          {/* Parallax glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-primary rounded-full blur-[100px] opacity-20 pointer-events-none"
            animate={{
              x: `calc(-50% + ${mousePos.x * 30}px)`,
              y: `calc(-50% + ${mousePos.y * 30}px)`
            }}
            transition={{ type: "spring", damping: 50, stiffness: 200 }}
          />

          {/* Phone Mockup Frame */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-[300px] h-[600px] bg-[#121212] rounded-[40px] p-3 border-4 border-gray-800 shadow-2xl overflow-hidden"
          >
            {/* Screen Content */}
            <div className="absolute inset-3 bg-background rounded-[32px] overflow-hidden flex flex-col">
              
              {/* Map Background (Abstract Grid) */}
              <div className="absolute inset-0 bg-[#F5F5F8] dark:bg-[#1A1A2E] z-0">
                <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(#E8751A 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              </div>

              {/* Status Header */}
              <div className="bg-card/80 backdrop-blur-md p-4 relative z-10 rounded-b-3xl border-b border-border shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Mechanic En Route</h4>
                    <p className="text-xs text-muted-foreground">Arriving in 12 mins</p>
                  </div>
                </div>
              </div>

              {/* Map Route SVG */}
              <div className="flex-1 relative z-10 p-4 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-md">
                  <path d="M20 80 Q 40 40 80 20" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="4" strokeDasharray="4 4" />
                  <path d="M20 80 Q 40 40 80 20" fill="none" stroke="#E8751A" strokeWidth="4" />
                  <circle cx="20" cy="80" r="4" fill="#E8751A" />
                  <circle cx="80" cy="20" r="4" fill="#1A1A2E" className="dark:fill-white" />
                </svg>
              </div>

              {/* Bottom Drawer */}
              <div className="bg-card p-5 rounded-t-3xl border-t border-border relative z-10 shadow-[0_-4px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.2)]">
                <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-primary relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/20" />
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-xs">AY</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">Anusha Yadav</h5>
                      <div className="flex text-xs text-yellow-500">
                        ★★★★★
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold">
                    YAMAHA R15
                  </div>
                </div>

                <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors shadow-md">
                  Call Mechanic
                </button>
              </div>

            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
          <button className="flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-xl hover:bg-foreground/90 transition-transform hover:-translate-y-1">
            <Smartphone className="w-6 h-6" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider">Download on the</div>
              <div className="font-bold text-sm leading-tight">App Store</div>
            </div>
          </button>
          <button className="flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-xl hover:bg-foreground/90 transition-transform hover:-translate-y-1">
            <Download className="w-6 h-6" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider">Get it on</div>
              <div className="font-bold text-sm leading-tight">Google Play</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
