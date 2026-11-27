import {
  PiShieldCheck,
  PiNavigationArrow,
  PiPhoneCall,
  PiLifebuoy,
} from "react-icons/pi";
import { SpotlightCard, TiltCard, FadeSlideIn, StaggeredGrid, staggerItem } from "@/components/ui/card-animations";
import { motion } from "framer-motion";

const pillars = [
  {
    Icon: PiShieldCheck,
    title: "Verified Mechanics",
    desc: "Every mechanic's documents are reviewed by our team before they can go online and take a single job.",
    emphasis: "Admin review before first job",
  },
  {
    Icon: PiNavigationArrow,
    title: "Live Tracking",
    desc: "Watch your mechanic move toward you in real time, from accept to arrival. ETA from the moment they're assigned.",
    emphasis: "Real-time location · polling fallback",
  },
  {
    Icon: PiPhoneCall,
    title: "In-App Call & Chat",
    desc: "Audio call and chat are built into every job — talk to your mechanic without sharing your number.",
    emphasis: "No number exchange required",
  },
  {
    Icon: PiLifebuoy,
    title: "Book for Someone Else",
    desc: "Send help to a family member — choose whether the mechanic contacts you or them directly.",
    emphasis: "Beneficiary + contact preference",
  },
];

export function WhyMechZie() {
  return (
    <section id="why-us" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      {/* Large watermark */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(5rem,16vw,12rem)] leading-none font-black text-foreground/[0.06] whitespace-nowrap"
          style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.08em" }}
        >
          MECHZIE
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
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
              Not a Directory. A Dispatch.
            </h2>
          </FadeSlideIn>
          <FadeSlideIn delay={0.12}>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md">
              Every capability below is live in the app — not a promise, a mechanism.
            </p>
          </FadeSlideIn>
        </div>

        {/* Pillars */}
        <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
          {pillars.map((pillar, i) => (
            <motion.div key={i} variants={staggerItem}>
              <TiltCard maxTilt={5}>
                <SpotlightCard className="p-7 h-full group">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                      <pillar.Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">{pillar.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {pillar.desc}
                      </p>
                      <p className="text-xs font-semibold text-primary/80">{pillar.emphasis}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </StaggeredGrid>
      </div>
    </section>
  );
}
