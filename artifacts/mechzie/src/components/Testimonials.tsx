import { motion } from "framer-motion";
import { ShieldCheck, Zap, MapPin, PhoneCall, CreditCard, LifeBuoy } from "lucide-react";

// No real customer testimonials exist yet, and we don't fabricate them. This
// section earns trust the honest way: by showing the actual mechanisms behind
// every MechZie rescue, all confirmed by the MechZie API (see PRODUCT.md).
const pillars = [
  {
    icon: ShieldCheck,
    title: "Verified mechanics only",
    desc: "Every mechanic's documents are reviewed by our team before they can go online and take a single job.",
  },
  {
    icon: Zap,
    title: "First to accept is dispatched",
    desc: "Your request goes to nearby available mechanics at once — the first to accept is assigned instantly. No ringing out one by one.",
  },
  {
    icon: MapPin,
    title: "Live tracking to your location",
    desc: "Watch your mechanic move toward you in real time, with an ETA you can actually plan around.",
  },
  {
    icon: PhoneCall,
    title: "Talk in the app",
    desc: "Audio call and chat are built into every job, so you can explain the problem without sharing your number.",
  },
  {
    icon: CreditCard,
    title: "Transparent digital payment",
    desc: "Pay securely in the app with Razorpay. Itemized line items, no haggling on the roadside.",
  },
  {
    icon: LifeBuoy,
    title: "Booking for someone else",
    desc: "Send help to a family member or friend and choose who the mechanic contacts — you or them.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Why riders trust MechZie</h2>
          <p className="text-muted-foreground text-lg">
            Not promises — the actual mechanics behind every rescue.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="p-8 rounded-3xl border border-border bg-card text-card-foreground"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
