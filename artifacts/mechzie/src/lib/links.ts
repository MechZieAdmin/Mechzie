/**
 * Canonical outbound/anchor links for the MechZie landing page.
 * Single source of truth — every CTA imports from here.
 *
 * NOTE: `playStore` is the intended destination for all "get the app" CTAs.
 * Confirm the real Play Store listing URL with the team and update it here
 * once; every CTA will follow.
 */
export const LINKS = {
  /** Google Play listing for the MechZie Android app. TODO: confirm final URL. */
  playStore: "https://play.google.com/store/apps/details?id=in.mechzie.app",
  /** In-page anchors (must match section ids on the landing page). */
  anchors: {
    services: "#services",
    howItWorks: "#how-it-works",
    whyUs: "#why-us",
    app: "#app",
    sos: "#advanced-sos",
    testimonials: "#testimonials",
  },
  /** wouter routes (already registered in App.tsx). */
  routes: {
    privacy: "/privacy-policy",
    terms: "/terms-and-conditions",
  },
  /** Social profiles. TODO: confirm real handles with the team. */
  social: {
    twitter: "https://twitter.com/mechzie",
    instagram: "https://instagram.com/mechzie",
    linkedin: "https://linkedin.com/company/mechzie",
    facebook: "https://facebook.com/mechzie",
  },
} as const;

/**
 * Smooth-scroll to an in-page anchor by id. These sections only exist on the
 * home page, so when the user is on another route (privacy/terms) we navigate
 * home first, then scroll once the section is present.
 */
export function scrollToAnchor(anchor: string) {
  const id = anchor.replace(/^#/, "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }
  // Not on the home page (or section not yet mounted) — go home, then scroll.
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  window.location.assign(`${base}/${anchor}`);
}
