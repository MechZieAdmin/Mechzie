import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyMechZie } from "@/components/WhyMechZie";
import { AppPreview } from "@/components/AppPreview";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MouseGlow } from "@/components/MouseGlow";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20 selection:text-primary">
      <LoadingScreen />
      <MouseGlow />
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <WhyMechZie />
        <AppPreview />
        <Testimonials />
        
        {/* Final CTA Section */}
        <section className="py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pattern-grid-lg" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8">
              Road Problems Don't Wait. <br />
              <span className="text-primary">Neither Do We.</span>
            </h2>
            
            <button className="group relative inline-flex items-center justify-center px-10 py-5 bg-primary text-white font-bold text-lg rounded-full overflow-hidden shadow-[0_0_40px_rgba(232,117,26,0.3)] transition-transform hover:scale-105">
              <span className="relative z-10">Get MechZie Now</span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Add this to your global CSS or tailwind config for the shimmer animation
// @keyframes shimmer {
//   100% { transform: translateX(100%); }
// }
