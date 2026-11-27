import { motion } from "framer-motion";
import {
  PiWarningCircle,
  PiTire,
  PiTruck,
  PiEngine,
  PiBatteryChargingVertical,
  PiDropHalf,
} from "react-icons/pi";
import { SpotlightCard, TiltCard, StaggeredGrid, staggerItem } from "@/components/ui/card-animations";

const services = [
  {
    Icon: PiWarningCircle,
    title: "Emergency Repair",
    description: "Rapid response for unexpected breakdowns on the road.",
  },
  {
    Icon: PiTire,
    title: "Flat Tyre Support",
    description: "Quick puncture fixes and tube replacements at your location.",
  },
  {
    Icon: PiTruck,
    title: "Doorstep Service",
    description: "Routine maintenance and servicing right in your driveway.",
  },
  {
    Icon: PiEngine,
    title: "Engine Diagnostics",
    description: "Advanced scanning to identify and fix engine issues.",
  },
  {
    Icon: PiBatteryChargingVertical,
    title: "Battery Support",
    description: "Jump starts and battery replacements to get you moving.",
  },
  {
    Icon: PiDropHalf,
    title: "Fuel Assistance",
    description: "Emergency fuel delivery when you run dry unexpectedly.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-divider mb-5"
          />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="text-[clamp(2.6rem,6vw,4.2rem)] leading-none text-foreground mb-5"
            style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.06em" }}
          >
            What We Fix
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-base max-w-lg leading-relaxed"
          >
            From minor fixes to major emergencies — a verified mechanic handles
            everything your bike needs, dispatched to your location.
          </motion.p>
        </div>

        {/* Grid with spotlight cards + tilt */}
        <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div key={index} variants={staggerItem}>
              <TiltCard maxTilt={6}>
                <SpotlightCard className="p-7 h-full group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200 group-hover:bg-primary"
                    style={{ background: "hsl(26 88% 52% / 0.12)" }}
                  >
                    <service.Icon
                      size={22}
                      className="transition-colors duration-200 group-hover:text-white"
                      style={{ color: "hsl(26 88% 52%)" }}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </StaggeredGrid>
      </div>
    </section>
  );
}
