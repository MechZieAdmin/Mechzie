import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, UserCheck, ThumbsUp } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: <MapPin className="w-6 h-6" />,
    title: "Request Help",
    desc: "Share your location and bike issue in the app. Takes less than 60 seconds."
  },
  {
    num: "02",
    icon: <UserCheck className="w-6 h-6" />,
    title: "Mechanic Arrives",
    desc: "A verified mechanic accepts your request and arrives within 15-30 minutes."
  },
  {
    num: "03",
    icon: <ThumbsUp className="w-6 h-6" />,
    title: "Ride Again",
    desc: "Your bike gets fixed on the spot. Pay seamlessly and get back on the road."
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" className="py-32 bg-[#121212] text-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            How MechZie Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Three simple steps between a breakdown and getting back on the road.
          </motion.p>
        </div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Desktop horizontal line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-primary origin-left" style={{ width: lineWidth }} />
          </div>

          {/* Mobile vertical line */}
          <div className="md:hidden absolute top-0 bottom-0 left-[31px] w-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="w-full bg-primary origin-top" style={{ height: lineHeight }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2 }}
                className="relative flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-8 z-10"
              >
                <div className="relative shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: index * 0.2 + 0.2 }}
                    className="w-16 h-16 rounded-full bg-[#1A1A2E] border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_20px_rgba(232,117,26,0.3)] z-10 relative"
                  >
                    {step.icon}
                  </motion.div>
                </div>
                
                <div className="md:text-center pt-2 md:pt-0">
                  <div className="text-primary font-mono text-sm font-bold mb-2">STEP {step.num}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
