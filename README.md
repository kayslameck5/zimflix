# Zimflix — pre-launch waitlist

A lightweight, static landing page for the Zimflix pre-launch announcement and waitlist. The site is intentionally separate from the future streaming platform.

## What is included
- Responsive, investor-friendly pre-launch landing page
- Approved Zimflix Zimbabwe Bird striped playmark (gold bird) in the header and hero
- Automatic light/dark theme detection using the visitor's browser preference
- Manual theme toggle, stored locally
- Motion and section-reveal effects with reduced-motion support
- Supabase-backed email waitlist form and duplicate detection
- Supabase migration and the waitlist confirmation Edge Function source

## Hosting
This repository is connected to Vercel. It is a static website: the root `index.html` is served directly and does not require a Node.js server or a build command.

## Waitlist backend
The form submits directly to Supabase REST API using the public publishable key and the `public.waitlist_signups` table. The table grants anonymous visitors insert-only access under Row Level Security. Public visitors cannot read the list.

Supabase project: `vqsulwwcrirxbymdhdul`

## Confirmation emails
The Edge Function source is in `supabase/functions/waitlist-confirmation/index.ts`. It is deployed to Supabase, but email sending is not active until a verified sender domain, `RESEND_API_KEY`, `WAITLIST_FROM_EMAIL`, `SITE_URL`, and a database INSERT webhook are configured.

The site therefore confirms successful waitlist registration in the browser, but does not claim that a confirmation email has been sent.

## Scope
This is a pre-launch marketing and waitlist site, not the production streaming application. The future app, creator studio, education system, advertising network, gifts, marketplace and admin console are not part of this release.
