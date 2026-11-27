import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyMechZie } from "@/components/WhyMechZie";
import { AppPreview } from "@/components/AppPreview";
import { SOSShowcase } from "@/components/SOSShowcase";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Landing() {
  // Honor a #anchor in the URL (e.g. arriving from the privacy page's nav)
  // by scrolling to the section once the page has mounted.
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20 selection:text-primary">
      <LoadingScreen />
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <WhyMechZie />
        <AppPreview />
        <SOSShowcase />
      </main>

      <Footer />
    </div>
  );
}
