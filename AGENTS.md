# Zimflix repository instructions for coding agents

Before editing, read `docs/HYPERAGENT_HANDOFF.md` and the complete handoff ZIP supplied by the project owner.

## Project scope
This repository is the pre-launch marketing and waitlist website for Zimflix. It is not the production streaming platform. The objective is a polished, credible five-page public site plus secondary information pages, a reliable waitlist and a protected admin dashboard.

## Five core pages
- `/` Home
- `/platform` Six-part ecosystem
- `/study` ZIMSEC/Cambridge education experience
- `/creators` Creator, educator, advertiser and partner proposition
- `/about` Purpose, principles and Zimbabwe-first identity

Secondary routes should include FAQ, Updates, Contact, Press/Investor, Terms, Privacy, Cookies, Content Guidelines and Copyright/Takedown.

## Brand
Use the approved Zimflix v1.3 assets. Preserve the exact gold Zimbabwe Bird artwork inside the Zimbabwe-colour striped playmark. Do not redraw or substitute the bird. Brand tokens: forest #063B20, emerald #07843E, lime #75F044, red #D71920, yellow #FFD21F, flag green #319208, gold #D4AF37. Respect light/dark theme and reduced motion.

## Accuracy
Zimflix is pre-launch. Label features as planned/in development unless they are truly live. Do not invent users, creators, partners, testimonials, prices, launch dates, revenue, app availability or telecom data deals. Avoid saying streaming, monetisation, marketplace checkout, virtual gifts, creator payouts or data zero-rating are already available.

## Data and security
The existing Supabase waitlist table must be inspected before migration. Preserve all existing data and RLS. Anonymous visitors may insert allowed waitlist fields only; they must never read/update/delete rows. Protect the admin UI and every admin API/server action with server-side authentication and an explicit admin role/allowlist. Keep service-role keys, Resend keys and webhook secrets server-side only. Never commit credentials.

## Workflow
Audit first, plan, then implement in small commits. Run lint, typecheck, tests and production build. Test mobile, light/dark, accessibility, waitlist duplicates, anonymous permissions and admin authorization. Push to main without force-push, verify the existing Vercel production deployment, and document the deployment URL, commit and any remaining blockers.
