import { motion } from "framer-motion";
import { PiWrench, PiWallet, PiShieldCheck, PiArrowRight } from "react-icons/pi";
import { SpotlightCard, TiltCard, FadeSlideIn, StaggeredGrid, staggerItem } from "@/components/ui/card-animations";
import { LINKS } from "@/lib/links";

const benefits = [
  {
    Icon: PiWallet,
    title: "In-App Wallet & UPI Payouts",
    desc: "Earnings go directly to your wallet. Link your UPI account and withdraw on your schedule — no waiting for weekly settlements.",
  },
  {
    Icon: PiShieldCheck,
    title: "Build Your Verified Profile",
    desc: "Document verification before your first job. Riders see your rating and specialty — trust you build carries forward.",
  },
  {
    Icon: PiWrench,
    title: "Jobs Dispatched to You",
    desc: "Nearby requests appear in real time. The first mechanic to accept gets the job — active mechanics earn more.",
  },
];

export function SOSShowcase() {
  return (
    <section id="partner" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      {/* Warm glow */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, hsl(26 88% 52% / 0.07) 0%, transparent 65%)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left — CTA */}
          <div className="flex-1 lg:sticky top-28">
            <FadeSlideIn>
              <span className="section-divider mb-5" />
            </FadeSlideIn>
            <FadeSlideIn delay={0.06}>
              <h2
                className="text-[clamp(2.6rem,6vw,4.2rem)] leading-none text-foreground mb-5"
                style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.06em" }}
              >
                Are You a Mechanic?
              </h2>
            </FadeSlideIn>
            <FadeSlideIn delay={0.12}>
              <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-sm">
                Join MechZie and earn on your own schedule. Verified mechanics
                get dispatched jobs, manage earnings in a built-in wallet, and
                withdraw via UPI.
              </p>
            </FadeSlideIn>
            <FadeSlideIn delay={0.18}>
              <a
                href={LINKS.mechanicPlayStore}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex gap-2.5 px-7 py-3.5 text-base"
              >
                Get MechZie Pro
                <PiArrowRight size={18} />
              </a>
              <p className="mt-3 text-xs text-muted-foreground">
                Free on Google Play for verified mechanics
              </p>
            </FadeSlideIn>
          </div>

          {/* Right — benefit cards */}
          <StaggeredGrid className="flex-1 flex flex-col gap-4">
            {benefits.map((b, i) => (
              <motion.div key={i} variants={staggerItem}>
                <TiltCard maxTilt={4}>
                  <SpotlightCard className="p-6 group">
                    <div className="flex gap-5 items-start">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                        <b.Icon size={22} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-foreground mb-1.5">{b.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            ))}
          </StaggeredGrid>
        </div>
      </div>
    </section>
  );
}
