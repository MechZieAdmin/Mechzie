import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

const reviews = [
  {
    name: "Siva",
    location: "Hyderabad",
    initials: "SI",
    color: "bg-blue-500",
    text: "Engine died on the freeway at 11 PM. MechZie had a guy there in 20 minutes. Incredible service, saved my night.",
    dark: true
  },
  {
    name: "Trishnak",
    location: "Bangalore",
    initials: "TR",
    color: "bg-purple-500",
    text: "Super smooth app. Knew exactly when the mechanic was arriving. Fixed my flat tire and I was back riding in no time.",
    dark: false
  },
  {
    name: "Raj Tarun",
    location: "Chennai",
    initials: "RT",
    color: "bg-green-500",
    text: "The mechanics are legit. Diagnosed a weird electrical issue on the spot that my regular shop missed. 10/10.",
    dark: true
  },
  {
    name: "Sudharshan",
    location: "Pune",
    initials: "SD",
    color: "bg-red-500",
    text: "I don't ride without this app anymore. It's like having a pit crew on speed dial. Prices are transparent too.",
    dark: false
  },
  {
    name: "Jyothish",
    location: "Kochi",
    initials: "JY",
    color: "bg-teal-500",
    text: "Battery died before a big trip. Booked through MechZie and they swapped it out in my driveway within the hour.",
    dark: true
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4">What Riders Are Saying</h2>
        <p className="text-muted-foreground text-lg">Don't just take our word for it.</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
          className="flex whitespace-nowrap gap-6 px-3"
        >
          {/* Double the array for seamless infinite scroll */}
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-[350px] sm:w-[400px] p-8 rounded-3xl border whitespace-normal transition-shadow ${
                review.dark
                  ? "bg-[#121212] border-gray-800 text-white"
                  : "bg-card border-border text-foreground"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-base flex items-center gap-1">
                      {review.name}
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </h4>
                    <span className={`text-xs ${review.dark ? "text-gray-400" : "text-muted-foreground"}`}>
                      {review.location}
                    </span>
                  </div>
                </div>
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${review.dark ? "text-gray-300" : "text-muted-foreground"}`}>
                "{review.text}"
              </p>
            </div>
          ))}
        </motion.div>
        
        {/* Gradients for smooth edge fading */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
