import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { LINKS, scrollToAnchor } from "@/lib/links";

const SOCIALS = [
  { icon: Twitter, href: LINKS.social.twitter, label: "Twitter" },
  { icon: Instagram, href: LINKS.social.instagram, label: "Instagram" },
  { icon: Facebook, href: LINKS.social.facebook, label: "Facebook" },
  { icon: Linkedin, href: LINKS.social.linkedin, label: "LinkedIn" },
];

const QUICK_LINKS: { label: string; anchor: string }[] = [
  { label: "Services", anchor: LINKS.anchors.services },
  { label: "How It Works", anchor: LINKS.anchors.howItWorks },
  { label: "Why Us", anchor: LINKS.anchors.whyUs },
  { label: "Testimonials", anchor: LINKS.anchors.testimonials },
];

export function Footer() {
  return (
    <footer className="dark bg-background text-foreground pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight mb-4">
              <Logo size={36} className="text-primary" />
              <span>Mech<span className="text-primary">Zie</span></span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Fast doorstep bike repair and emergency mechanic support anytime, anywhere. Your reliable pit crew.
            </p>
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {QUICK_LINKS.map((l) => (
                <li key={l.anchor}>
                  <a
                    href={`/${l.anchor}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToAnchor(l.anchor);
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="mailto:admin@mechzie.in" className="hover:text-white transition-colors">
                  admin@mechzie.in
                </a>
              </li>
              <li>
                <a href="tel:+918247767685" className="hover:text-white transition-colors">
                  +91 8247767685
                </a>
              </li>
              <li>123-dwaraka nagar<br />Vishakapatnam,530001 </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MechZie. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href={LINKS.routes.privacy} className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href={LINKS.routes.terms} className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}