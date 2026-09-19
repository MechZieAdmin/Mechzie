import { motion } from "framer-motion";
import { ShieldCheck, Navigation, PhoneCall, LifeBuoy } from "lucide-react";

// Trust signals grounded in the real MechZie API (see .impeccable/sources/openapi.yaml) —
// no fabricated numbers. Every claim maps to a shipped capability.
const pillars = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: "Verified Mechanics",
    desc: "Every mechanic is document-verified by our team before they can go online.",
  },
  {
    icon: <Navigation className="w-6 h-6 text-white" />,
    title: "Live Tracking",
    desc: "Watch your mechanic's approach in real time, from accept to arrival.",
  },
  {
    icon: <PhoneCall className="w-6 h-6 text-white" />,
    title: "In-App Call & Chat",
    desc: "Talk to your mechanic the moment they accept — no number sharing needed.",
  },
  {
    icon: <LifeBuoy className="w-6 h-6 text-white" />,
    title: "Help in Minutes",
    desc: "Your job is offered to nearby verified mechanics and the first to accept is dispatched.",
  },
];

export function WhyMechZie() {
  return (
    <section id="why-us" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Why MechZie</h2>
          <p className="text-muted-foreground text-lg">
            A dispatched, tracked, paid-in-app rescue — not a directory of phone numbers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center mb-6 shadow-lg transform transition-transform group-hover:scale-110">
                {pillar.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
