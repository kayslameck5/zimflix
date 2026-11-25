# Zimflix — HyperAgent handoff summary

**Full handoff ZIP:** The project owner will provide `Zimflix_HyperAgent_Handoff_v1.zip`. It contains the complete product context, detailed five-page content/IA, waitlist/admin/email requirements, brand guide, FAQ/content rules, acceptance tests, design references, approved v1.3 assets and three phased HyperAgent prompts. Read that package before implementation.

## Existing infrastructure
- GitHub: https://github.com/kayslameck5/zimflix (public; branch `main`)
- Vercel project: `zimflix`, team/workspace `zimflix` (Hobby)
- Production alias observed at handoff: https://zimflix-zimflix.vercel.app
- Supabase project ref: `vqsulwwcrirxbymdhdul`
- Supabase URL: https://vqsulwwcrirxbymdhdul.supabase.co
- Existing table: `public.waitlist_signups` with unique email and insert-only public RLS
- Existing Edge Function: `waitlist-confirmation`; it is deployed but email sending is not configured.

Verify all IDs, branch, aliases, permissions, schema, policies and deployment before changing anything. Preserve the existing Vercel project, Supabase waitlist data and Git history.

## Product
Zimflix is a Zimbabwe-first digital media and commerce ecosystem in pre-launch. Its six planned destinations are:
1. Zimflix Play — films, series, comedy, documentaries and short-form video.
2. Zimflix Study — ZIMSEC O-Level/A-Level and Cambridge IGCSE/AS/A-Level learning paths.
3. Zimflix Music — Zimbabwean artist, track, album, playlist and music-video discovery, subject to rights.
4. Zimflix Voices — podcasts, interviews and audio storytelling.
5. Zimflix Vibes — planned virtual gifts/rewards for creators.
6. Zimflix Market — planned verified-seller marketplace.

Potential platform/business tools: Creator Studio, Zimflix Ads, Seller Centre and an auditable financial ledger. All future features must be labelled planned or in development until actually delivered.

## Website goal
Build five core public pages: Home, Platform, Study, Creators & Partners, About. Add FAQ, Updates/Announcements, Contact, Press/Investor overview, Terms, Privacy, Cookies, Content Guidelines and Copyright/Takedown. The site must explain the idea in detail, not be an empty “coming soon” page. Include a high-quality waitlist experience and a secure admin area.

## Brand
Use exact approved v1.3 assets and gold Zimbabwe Bird playmark. Colours: forest #063B20, emerald #07843E, lime #75F044, flag red #D71920, yellow #FFD21F, flag green #319208, white #FFFFFF, black #080B09, gold #D4AF37. Green is primary; flag colours are selective accents. English is primary, with contextual Shona/isiNdebele support. Use contemporary slang sparingly and validate any language with native speakers.

## Waitlist/admin
Inspect the live Supabase schema first. Do not drop/recreate/truncate. Keep public insert-only RLS. Duplicate handling, validation, consent, bot/rate-limit protection and accessible statuses are required. Admin access must be protected both at page and API/server-action layer with server-side role checks. Never expose the service-role key in client code. Add filters, pagination, actual signup metrics and controlled CSV export. No fake seed data in production.

## Email status
The deployed confirmation function needs Resend credentials, a verified Zimflix-owned sender domain, secure webhook configuration and a database INSERT webhook. Do not use unrelated sender domains. If the owner has not provided a domain they control, keep email delivery pending and ensure UI copy does not claim that an email has been sent.

## Important
No fabricated metrics, partner logos, client names, testimonials, prices, launch dates, creator RPM guarantees, telco deals, or claims that the apps/platform are available. Privacy and Terms content needs Zimbabwean legal review. This is a marketing/waitlist scope, not the full streaming-app implementation.

Follow prompts in the ZIP in order: 01 audit, 02 implement, 03 deployment and final QA.
