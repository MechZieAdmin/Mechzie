import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { LINKS, scrollToAnchor } from "@/lib/links";
import { PiTwitterLogo, PiInstagramLogo, PiFacebookLogo, PiLinkedinLogo } from "react-icons/pi";

const SOCIALS = [
  { Icon: PiTwitterLogo, href: LINKS.social.twitter, label: "Twitter" },
  { Icon: PiInstagramLogo, href: LINKS.social.instagram, label: "Instagram" },
  { Icon: PiFacebookLogo, href: LINKS.social.facebook, label: "Facebook" },
  { Icon: PiLinkedinLogo, href: LINKS.social.linkedin, label: "LinkedIn" },
];

const QUICK_LINKS: { label: string; anchor: string }[] = [
  { label: "Services", anchor: LINKS.anchors.services },
  { label: "How It Works", anchor: LINKS.anchors.howItWorks },
  { label: "Why MechZie", anchor: LINKS.anchors.whyUs },
];

export function Footer() {
  return (
    <footer className="bg-[hsl(var(--muted))] text-foreground border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <Logo size={26} className="text-primary" />
              <span
                className="text-base font-bold text-foreground"
                style={{ fontFamily: "var(--app-font-sans)", letterSpacing: "0.02em" }}
              >
                Mech<span className="text-primary">Zie</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              On-demand roadside mechanic dispatch for India. A verified mechanic
              dispatched, tracked, and paid through the app — not a directory.
            </p>

            {/* Contact */}
            <div className="space-y-1.5 mb-6">
              <a
                href="mailto:admin@mechzie.in"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                admin@mechzie.in
              </a>
              <a
                href="tel:+918247767685"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                +91 82477 67685
              </a>
              <p className="text-sm text-muted-foreground">
                VARNA INFOTECH PVT LTD
                <br />
                5th Floor, VMRDA THE DECK
                <br />
                SIRIPURAM, VISAKHAPATNAM
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.anchor}>
                  <a
                    href={`#${l.anchor}`}
                    onClick={(e) => { e.preventDefault(); scrollToAnchor(l.anchor); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* App download */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-5">
              Get the App
            </h3>
            <a
              href={LINKS.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-border bg-card rounded-lg px-4 py-3 hover:border-primary/50 transition-colors group"
            >
              <div className="text-foreground group-hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83 1-.99 1.4-.46l14 8a.65.65 0 010 .92l-14 8c-.4.53-1.4.37-1.4-.46z"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Get it on</p>
                <p className="text-sm font-semibold text-foreground leading-tight">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>&copy; {new Date().getFullYear()} MechZie. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href={LINKS.routes.privacy} className="hover:text-muted-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href={LINKS.routes.terms} className="hover:text-muted-foreground transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}