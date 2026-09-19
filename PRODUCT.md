# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

(Marketing + internal web surfaces. The consumer/mechanic product itself is an Android app; the API spec and app code are the source of truth for native surfaces.)

## Users

Three confirmed audiences, all served by the web surfaces:

1. **Riders/drivers** — vehicle owners (two-wheeler through commercial, per API `Vehicle.type`) stranded by a breakdown. Their job: get a verified mechanic dispatched to their location fast, track them live, pay digitally, and feel safe while waiting. They act under stress, often one-handed on a phone, sometimes on behalf of someone else (API supports booking for a `beneficiary` with separate `contact_preference`).
2. **Investors/partners** — evaluating whether MechZie is a real, credible, well-run platform. Their job: understand the product and trust the operation behind it.
3. **Mechanics** — independent mechanics evaluating joining the platform. Their job: understand earnings (wallet, UPI payouts), the verification process, and how jobs get dispatched to them.

## Product Purpose

MechZie is an **on-demand roadside mechanic dispatch service** for India. A stranded rider requests help in the Android app; the platform dispatches a verified nearby mechanic, tracks the rescue live, and handles payment digitally. The web surfaces (this repo) exist to **explain that product** — the landing page's one job is comprehension: what MechZie is, that it is real, and that it can be trusted in an emergency. Success on the landing = a visitor (rider, investor, or mechanic) understands the product and believes it works.

## Positioning

Mechanism a neighbor could not truthfully copy, per the API: **atomic dispatch** — when a customer creates a job, offers go to available verified mechanics and the first accept *atomically claims* the job (HTTP 409 on races; other offers auto-expire/supersede). Combined with: admin-verified mechanic onboarding (documents reviewed before a mechanic can go online), live job tracking, in-job audio calls and chat, and Razorpay-native payment. The positioning is not "a directory of mechanics" — it is a dispatched, tracked, paid-in-app rescue with verified humans on the other end.

## Operating Context

- **Emergency conditions**: users interact while stranded on roads — poor connectivity, low battery, one hand, high stress. Clarity and speed of comprehension beat richness.
- **India market, English-language UI** (confirmed). Payments via Razorpay; mechanic payouts via UPI; phone auth via +91 numbers with Firebase OTP.
- **Book-for-someone-else** is a real workflow (beneficiary + contact preference), e.g. booking help for a family member.
- The landing page is the front door to the Android app, not the product itself — the rescue flow lives in the app.

## Capabilities and Constraints

Confirmed by the MechZie API (v1.0.0-rc1, source archived at `.impeccable/sources/openapi.yaml`):

- **Auth**: Firebase phone OTP → JWT (`/auth/verify-otp`), refresh/logout, separate rate-limited admin login.
- **Roles**: `customer`, `mechanic`, `admin`, `super_admin` (invite-based admin onboarding, role assignment).
- **Job lifecycle**: `pending → accepted → en_route → arrived → in_progress → completed` (+ cancel with outstanding-fee handling, dispute/resolve). Mechanic-side transitions are explicit (`/jobs/{id}/accept|decline|en-route|arrive|start|complete`).
- **Jobs**: created with service category + pickup address/lat/lng; optional `beneficiary_phone` + `contact_preference: booker|beneficiary`. Line items added by mechanic; disputes on completed jobs.
- **Tracking**: real-time location tracking (`/tracking/jobs/{id}`, with HTTP polling fallback; mechanic location updates).
- **Comms**: in-job audio calls via 100ms rooms with FCM+Redis call signaling (initiate/accept/decline/cancel/end), plus persistent chat (Socket.IO + REST fallback).
- **Payments**: Razorpay order create/verify/webhook; per-job payment status; cancellation-fee checks.
- **Mechanic economics**: wallet summary/transactions, UPI accounts (admin-approved), payouts, disputes, refunds, settlements.
- **Trust**: admin verification pipeline for mechanics and documents; two-sided ratings (customer↔mechanic); users can store up to 2 emergency contacts.
- **Notifications**: FCM push tokens, paginated notifications.
- **No dedicated `/sos` endpoint exists** — the landing page's "SOS" story is a marketing layer over the fast job-dispatch flow. Future copy must not claim SOS features (satellite, crash detection, etc.) the API does not provide. This is exactly the kind of claim the current SOSShowcase section overstates.

## Brand Commitments

- **Name**: MechZie (spelling as-is; "MechZie Arrives" headline pattern in use).
- **Market language**: English UI for the India market.
- The warm orange identity in the current landing page exists and is distinctive; whether it is binding is an open decision for a future `$impeccable document` or new-work run — init records no visual world.

## Evidence on Hand

- **API spec**: `.impeccable/sources/openapi.yaml` (fetched from `https://internal.mechzie.in/docs/openapi.yaml`, 2026-09-19) — the authoritative product-truth source.
- **Repo surfaces**: `artifacts/mechzie` (marketing landing, Vite+React+Tailwind+shadcn), `artifacts/mockup-sandbox` (component preview tool, currently an empty shell — generated registry is empty, and its tokens diverge from the landing's), `artifacts/api-server`, `lib/*` (api-spec, api-zod, api-client-react, db).
- **No real testimonials, case studies, press, metrics, or customer evidence exist in the repo.** The current landing's testimonials and stat counters ("5000+ Verified Mechanics", "100% Live Tracking") are **fabricated placeholders** — future work must not treat them as real and must not invent replacements. Real numbers (mechanic count, cities, response times) must come from the team before they appear on any surface.

## Product Principles

1. **Calm in an emergency.** The user is stranded and stressed. Every surface should lower their heart rate — plain language, one clear action, no performed urgency (no rocket-launch theatrics).
2. **Prove it, don't claim it.** This is a trust product. Show the mechanism (verified mechanic assigned, live ETA, in-app call) instead of adjectives; never fabricate stats or testimonials.
3. **Comprehension before conversion.** The landing exists so three audiences understand the product; every section must answer "what is it and why believe it" for its audience.
4. **India-real.** Razorpay, UPI, +91, breakdowns on Indian roads — concrete and local, not generic-global SaaS copy.
5. **One product truth.** The API is the truth; marketing surfaces describe it, they don't invent beyond it.

## Accessibility & Inclusion

No formal standard confirmed. Product-specific need to carry forward: surfaces must remain usable under emergency conditions (one-handed mobile use, interruptions, low attention, possibly slow connections) and legible to a broad Indian audience — plain English, generous touch targets, no reliance on color alone for emergency states.

- **Book-for-someone-else** is a real workflow (beneficiary + contact preference), e.g. booking help for a family member.
- The landing page is the front door to the Android app, not the product itself — the rescue flow lives in the app.
