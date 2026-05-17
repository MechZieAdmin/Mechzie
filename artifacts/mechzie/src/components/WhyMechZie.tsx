import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Clock, ShieldCheck, Navigation, PhoneCall } from "lucide-react";

function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(end * easeOutQuart));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return (
    <motion.span
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true }}
    >
      {count}{suffix}
    </motion.span>
  );
}

const stats = [
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    value: 15,
    suffix: " Min",
    title: "Avg. Response Time",
    desc: "Fastest on-road support"
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    value: 5000,
    suffix: "+",
    title: "Verified Mechanics",
    desc: "Vetted & certified experts"
  },
  {
    icon: <Navigation className="w-6 h-6 text-white" />,
    value: 100,
    suffix: "%",
    title: "Live Tracking",
    desc: "See exactly when help arrives"
  },
  {
    icon: <PhoneCall className="w-6 h-6 text-white" />,
    value: 24,
    suffix: "/7",
    title: "Support",
    desc: "Always here when you need us"
  }
];

export function WhyMechZie() {
  return (
    <section id="why-us" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center mb-6 shadow-lg transform transition-transform group-hover:scale-110">
                {stat.icon}
              </div>
              <div className="text-4xl font-extrabold tracking-tight mb-2 text-foreground">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{stat.title}</h3>
              <p className="text-muted-foreground text-sm">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
