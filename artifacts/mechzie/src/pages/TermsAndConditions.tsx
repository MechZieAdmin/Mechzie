import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MouseGlow } from "@/components/MouseGlow";
import { FileText, ShieldAlert, CreditCard, Scale, HelpCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function TermsAndConditions() {
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
          <span className="text-foreground font-medium">Terms & Conditions</span>
        </div>

        {/* Header Section */}
        <div className="text-center md:text-left mb-16 relative">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Terms & <span className="text-primary">Conditions</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Last Updated: July 13, 2026. Please read these terms carefully before using our platform.
          </p>
          <div className="h-1 w-20 bg-primary mt-6 rounded-full" />
        </div>

        {/* Content Section */}
        <div className="bg-[#121212]/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 md:p-12 space-y-12 shadow-xl">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <FileText size={22} />
              </div>
              <h2 className="text-2xl font-bold text-white">1. Contractual Relationship</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Use (&quot;Terms&quot;) govern the access or use by you, an individual, from within India of applications, websites, content, products, and services (the &quot;Services&quot;) made available by MechZie. By accessing and using our Services, you agree to be bound by these Terms, which establish a contractual relationship between you and MechZie. If you do not agree to these Terms, you may not access or use the Services.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <Scale size={22} />
              </div>
              <h2 className="text-2xl font-bold text-white">2. The Services</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              MechZie operates an on-demand vehicle repair and roadside assistance aggregation platform. The Services enable users to request and schedule vehicle repair, towing, or maintenance services with independent third-party providers (referred to as &quot;Independent Mechanics&quot;).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You acknowledge that MechZie does not directly employ vehicle mechanics or provide vehicle repair/maintenance services. All services are performed by third-party independent technicians who are not employees or agents of MechZie.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <ShieldAlert size={22} />
              </div>
              <h2 className="text-2xl font-bold text-white">3. User Accounts & Responsibilities</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              In order to use most aspects of the Services, you must register for and maintain an active personal user Services account (&quot;Account&quot;). You must be at least 18 years of age to obtain an Account. You agree to maintain accurate, complete, and up-to-date information in your Account, including a valid mobile phone number and vehicle details.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You are responsible for all activity that occurs under your Account, and you agree to maintain the security and secrecy of your Account username and password at all times.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <CreditCard size={22} />
              </div>
              <h2 className="text-2xl font-bold text-white">4. Bookings, Payments, and Cancellations</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              You understand that use of the Services may result in charges to you for the services or goods you receive from an Independent Mechanic (&quot;Charges&quot;). MechZie will facilitate your payment of the applicable Charges on behalf of the Independent Mechanic.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Pricing:</strong> Standard diagnostics and service fees are visible in the app prior to booking. Extra spare parts and additional labor charges will be discussed and approved by you before the mechanic begins repairs.</li>
              <li><strong>Taxes:</strong> All payments facilitated by MechZie are inclusive of applicable taxes unless stated otherwise.</li>
              <li><strong>Cancellation Policy:</strong> A cancellation fee may apply if you cancel a service request after a mechanic has already been dispatched and is en route to your location.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <ShieldAlert size={22} />
              </div>
              <h2 className="text-2xl font-bold text-white">5. Limitation of Liability & Disclaimers</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The services are provided &quot;as is&quot; and &quot;as available.&quot; MechZie disclaims all representations and warranties, express, implied, or statutory, not expressly set out in these terms. In addition, MechZie makes no representation, warranty, or guarantee regarding the reliability, timeliness, quality, suitability, or availability of the services or that the services will be uninterrupted or error-free.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              MechZie shall not be liable for indirect, incidental, special, exemplary, punitive, or consequential damages, including lost profits, lost data, personal injury, or property damage related to, in connection with, or otherwise resulting from any use of the services, even if MechZie has been advised of the possibility of such damages.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <HelpCircle size={22} />
              </div>
              <h2 className="text-2xl font-bold text-white">6. Governing Law & Jurisdiction</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Except as otherwise set forth in these Terms, these Terms shall be governed by and construed in accordance with the laws of India. Any dispute, conflict, claim or controversy arising out of or broadly in connection with or relating to these Services or these Terms shall be subject to the exclusive jurisdiction of the courts in Visakhapatnam, Andhra Pradesh, India.
            </p>
          </section>

          <div className="border-t border-white/5 pt-8 space-y-4">
            <h3 className="text-lg font-bold text-white">Need Clarifications?</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              If you have any questions regarding these Terms &amp; Conditions or want to report a service issue, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground bg-white/5 p-4 rounded-xl border border-white/5">
              <div>
                <span className="block font-medium text-white mb-1">Email:</span>
                <a href="mailto:admin@mechzie.in" className="text-primary hover:underline">admin@mechzie.in</a>
              </div>
              <div>
                <span className="block font-medium text-white mb-1">Support Phone:</span>
                +91 8247767685
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
