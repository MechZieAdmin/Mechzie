import {
  PiShieldCheck,
  PiLightning,
  PiMapPin,
  PiPhoneCall,
  PiCreditCard,
  PiLifebuoy,
} from "react-icons/pi";
import { SpotlightCard, TiltCard, FadeSlideIn, StaggeredGrid, staggerItem } from "@/components/ui/card-animations";
import { motion } from "framer-motion";

const pillars = [
  {
    Icon: PiShieldCheck,
    title: "Verified mechanics only",
    desc: "Every mechanic's documents are reviewed by our team before they can go online and take a single job.",
  },
  {
    Icon: PiLightning,
    title: "First to accept is dispatched",
    desc: "Your request goes to nearby available mechanics at once — the first to accept is assigned instantly. No calling one by one.",
  },
  {
    Icon: PiMapPin,
    title: "Live tracking to your location",
    desc: "Watch your mechanic move toward you in real time, with an ETA you can actually plan around.",
  },
  {
    Icon: PiPhoneCall,
    title: "Talk in the app",
    desc: "Audio call and chat are built into every job, so you can explain the problem without sharing your number.",
  },
  {
    Icon: PiCreditCard,
    title: "Transparent digital payment",
    desc: "Pay securely in the app with Razorpay. Itemized line items, no haggling on the roadside.",
  },
  {
    Icon: PiLifebuoy,
    title: "Booking for someone else",
    desc: "Send help to a family member or friend and choose who the mechanic contacts — you or them.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <FadeSlideIn>
            <span className="section-divider mb-5" />
          </FadeSlideIn>
          <FadeSlideIn delay={0.06}>
            <h2
              className="text-[clamp(2.6rem,6vw,4.2rem)] leading-none text-foreground mb-5"
              style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.06em" }}
            >
              Why Riders Trust MechZie
            </h2>
          </FadeSlideIn>
          <FadeSlideIn delay={0.12}>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md">
              Not promises — the actual mechanisms behind every rescue.
            </p>
          </FadeSlideIn>
        </div>

        {/* Cards */}
        <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
          {pillars.map((pillar, i) => (
            <motion.div key={i} variants={staggerItem}>
              <TiltCard maxTilt={6}>
                <SpotlightCard className="p-6 h-full group">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                    <pillar.Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-2 leading-snug tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </StaggeredGrid>
      </div>
    </section>
  );
}
