# Zimflix — Pre-launch website

Zimflix is a Zimbabwe-first digital home for entertainment, music, learning and creators.

This repository contains the lightweight pre-launch waiting-list website. It is intentionally static so it can be deployed directly to Vercel without a Node.js server runtime.

## Features

- Responsive investor / early-adopter landing page
- Automatic browser light/dark preference with a manual override
- Zimflix green, lime and Zimbabwe-flag accent system
- Approved Zimflix gold Zimbabwe Bird playmark and light/dark wordmarks
- Supabase-backed email waitlist with duplicate detection and user feedback

## Deploy

The site is a static HTML deployment. Connect this repository to the existing Vercel project named `zimflix`, use the repository root as the root directory, set Framework Preset to **Other**, and leave the build command empty.

## Waitlist backend

The signup form submits to `public.waitlist_signups` in the connected Supabase project using the public publishable key and insert-only Row Level Security policy. No service-role key is exposed in the browser.

See `supabase/migrations/202611190001_create_waitlist.sql` for the schema and RLS policy.

## Email confirmation

The Supabase Edge Function in `supabase/functions/waitlist-confirmation/index.ts` is deployed, but email delivery requires a verified sender domain, a Resend API key, function secrets, and a database webhook. Do not display a confirmation-email success message until delivery is configured.

## Scope

This is a pre-launch marketing and waitlist website, not the production streaming application. Admin functions, investor analytics, creator uploads, streaming, marketplace and monetisation are not part of this site.
