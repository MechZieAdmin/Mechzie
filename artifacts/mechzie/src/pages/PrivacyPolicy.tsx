import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MouseGlow } from "@/components/MouseGlow";
import { Shield, Eye, Lock, FileText, Globe, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <MouseGlow />
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-24 relative z-10 max-w-4xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Privacy Policy</span>
        </div>

        {/* Header Section */}
        <div className="text-center md:text-left mb-16 relative">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Last Updated: July 13, 2026. Learn how MechZie protects and respects your privacy.
          </p>
          <div className="h-1 w-20 bg-primary mt-6 rounded-full" />
        </div>

        {/* Content Section */}
        <div className="bg-card/75 dark:bg-[#121212]/40 backdrop-blur-md border border-border dark:border-white/5 rounded-2xl p-8 md:p-12 space-y-12 shadow-xl">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <Shield size={22} />
              </div>
              <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to MechZie. We value your privacy and trust. This Privacy Policy describes how MechZie ("we", "us", or "our") collects, uses, stores, and shares your personal information when you use our website, mobile application, and the services provided by us. By accessing or using our services, you consent to the practices described in this policy.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <Eye size={22} />
              </div>
              <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We collect information to provide a seamless and secure roadside assistance experience. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground font-semibold">Account Information:</strong> Name, phone number, email address, and login credentials when you sign up.</li>
              <li><strong className="text-foreground font-semibold">Location Data:</strong> Real-time GPS location (crucial for locating your vehicle and routing the nearest mechanic to your exact location). You can enable or disable location tracking via device settings.</li>
              <li><strong className="text-foreground font-semibold">Vehicle Details:</strong> Vehicle make, model, year, license plate, and fuel type to ensure matching with correct spare parts and mechanics.</li>
              <li><strong className="text-foreground font-semibold">Service Requests:</strong> Photos, text descriptions of breakdown problems, and communication history with the mechanic.</li>
              <li><strong className="text-foreground font-semibold">Payment Details:</strong> Transaction details, payment methods, and billing information processed securely via certified third-party payment gateways.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <Globe size={22} />
              </div>
              <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To locate, dispatch, and navigate the nearest partner mechanic to your breakdown site.</li>
              <li>To create and manage your user account, verify phone numbers via OTP, and facilitate secure payments.</li>
              <li>To send real-time notification alerts regarding mechanic assignment, location updates, and arrival estimations.</li>
              <li>To improve and optimize our app performance, customer support service, and platform features.</li>
              <li>To ensure safety and prevent fraudulent bookings or activities.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <Lock size={22} />
              </div>
              <h2 className="text-2xl font-bold text-foreground">4. Data Sharing and Security</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We take the security of your data seriously. We share your information with mechanics and service partners only to the extent necessary to deliver roadside assistance. We employ industry-standard encryption, SSL, and firewalls to prevent unauthorized access or disclosure.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, rent, or trade your personal data to third parties for marketing purposes. Your location data is shared with the dispatched mechanic only while servicing your booking.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <FileText size={22} />
              </div>
              <h2 className="text-2xl font-bold text-foreground">5. Your Choices & Account Deletion</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              You can access, update, or correct your personal data through the MechZie application settings. If you wish to delete your account or revoke permissions (such as location tracking or contact access), you can do so in the profile settings or contact our support team. Please note that disabling location tracking will limit your ability to book roadside services.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <FileText size={22} />
              </div>
              <h2 className="text-2xl font-bold text-foreground">6. Changes to this Policy</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our services or legal obligations. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <div className="border-t border-border dark:border-white/5 pt-8 space-y-4">
            <h3 className="text-lg font-bold text-foreground">Contact Our Privacy Team</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For any questions, concerns, or requests regarding your data and privacy rights, please reach out to us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground bg-muted/50 dark:bg-white/5 p-4 rounded-xl border border-border dark:border-white/5">
              <div>
                <span className="block font-medium text-foreground mb-1">Email Support:</span>
                <a href="mailto:admin@mechzie.in" className="text-primary hover:underline">admin@mechzie.in</a>
              </div>
              <div>
                <span className="block font-medium text-foreground mb-1">Office Address:</span>
                123-dwaraka nagar, Visakhapatnam, Andhra Pradesh - 530001
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
