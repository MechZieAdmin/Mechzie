import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PiMapPin, PiUserCheck, PiThumbsUp } from "react-icons/pi";
import { FadeSlideIn } from "@/components/ui/card-animations";

const steps = [
  {
    Icon: PiMapPin,
    title: "Share Your Location",
    desc: "Open the app, describe the issue, and drop your pin. The request goes out in under 60 seconds.",
    detail: "Works anywhere in India · No address memorization needed",
  },
  {
    Icon: PiUserCheck,
    title: "Mechanic Dispatched",
    desc: "Nearby verified mechanics receive your request simultaneously. The first to accept is assigned — atomic dispatch, no delays.",
    detail: "Document-verified · Live ETA the moment they accept",
  },
  {
    Icon: PiThumbsUp,
    title: "Fixed. Paid. Back on Road.",
    desc: "Your mechanic fixes it on the spot. Pay with Razorpay in the app — itemized, no roadside haggling.",
    detail: "Razorpay · UPI · In-app call and chat throughout",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how-it-works" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <FadeSlideIn>
            <span className="section-divider mb-5" />
          </FadeSlideIn>
          <FadeSlideIn delay={0.06}>
            <h2
              className="text-[clamp(2.6rem,6vw,4.2rem)] leading-none text-foreground mb-5"
              style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.06em" }}
            >
              Three Steps to Fixed
            </h2>
          </FadeSlideIn>
          <FadeSlideIn delay={0.12}>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md">
              From stranded to back-on-road — the complete sequence inside the app.
            </p>
          </FadeSlideIn>
        </div>

        {/* Steps */}
        <div ref={containerRef} className="relative max-w-3xl">
          {/* Animated vertical progress line (desktop) */}
          <div className="hidden md:block absolute left-7 top-10 bottom-10 w-px bg-border overflow-hidden">
            <motion.div
              className="w-full origin-top bg-primary"
              style={{ scaleY: lineScale, height: "100%" }}
            />
          </div>

          <div className="space-y-16 md:space-y-20">
            {steps.map((step, index) => (
              <FadeSlideIn key={index} delay={index * 0.1} direction="left">
                <div className="flex gap-8 md:gap-12 items-start">
                  {/* Node */}
                  <div className="flex flex-col items-center shrink-0">
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 16,
                        delay: index * 0.12,
                      }}
                      whileHover={{ scale: 1.08 }}
                      className="w-14 h-14 rounded-full border-2 border-primary bg-card flex items-center justify-center text-primary shadow-[0_0_20px_hsl(26_88%_52%/0.2)] relative z-10 cursor-default"
                    >
                      <step.Icon size={20} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="pb-2">
                    <p className="text-xs font-bold text-primary uppercase tracking-[0.14em] mb-2">
                      Step {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className="text-[1.7rem] leading-tight text-foreground mb-3"
                      style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.06em" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3 max-w-lg">
                      {step.desc}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.detail}</p>
                  </div>
                </div>
              </FadeSlideIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
