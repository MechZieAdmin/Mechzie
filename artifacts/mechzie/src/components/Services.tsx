import { motion } from "framer-motion";
import { AlertCircle, Disc, Truck, Activity, Battery, Droplet } from "lucide-react";

const services = [
  {
    icon: <AlertCircle className="w-8 h-8" />,
    title: "Emergency Repair",
    description: "Rapid response for unexpected breakdowns on the road."
  },
  {
    icon: <Disc className="w-8 h-8" />,
    title: "Flat Tire Support",
    description: "Quick puncture fixes and tube replacements at your location."
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Doorstep Service",
    description: "Routine maintenance and servicing right in your driveway."
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Engine Diagnostics",
    description: "Advanced scanning to identify and fix engine issues."
  },
  {
    icon: <Battery className="w-8 h-8" />,
    title: "Battery Support",
    description: "Jump starts and battery replacements to get you moving."
  },
  {
    icon: <Droplet className="w-8 h-8" />,
    title: "Fuel Assistance",
    description: "Emergency fuel delivery when you run dry unexpectedly."
  }
];

export function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="services" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            Comprehensive Support
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            From minor fixes to major emergencies, our verified mechanics handle everything your bike needs.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(232,117,26,0.12)] group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
