# ModLab Project Memory

Single source of truth to resume work quickly. Update this at the end of each session.

## Overview
- Stack: Next.js 14 (App Router), Tailwind v4, Supabase (auth + DB)
- Current focus (Week 4): polish mobile UX, introduce media assets, add before/after slider, fix outstanding bugs.

## Current State (implemented)
- Layout/header/footer: `app/layout.js` with responsive SiteHeader drawer, toast + cart provider, social/footer grid.
- Home: `app/page.js` with hero, featured services, accessories highlights, booking preview placeholders.
- About: `app/about/page.js` split intro layout plus lead capture form (name, address, email, message).
- Services: `app/services/page.js` responsive grid with modal details and deep link to `/book?service={id}`.
- Products: `app/products/page.js` dark hero, featured products, supporting grid, feature list, cart buttons wired to store.
- Auth: `app/login/page.js` Supabase email/password sign in + sign up (stores `full_name` metadata).
- Booking: `app/book/page.js` gated by auth, inserts into Supabase `bookings` table; preselect via query string.
- Cart/Checkout: client cart store with localStorage persistence, checkout form pushes Supabase `orders` (or local fallback).
- Account: `/account/orders` lists user orders; `/account/orders/[id]` shows detail stepper; admin routes manage orders + seeding.
- Supabase client: `lib/supabase/client.js` handles lazy singleton, safe null when env vars missing.
- Styling: Tailwind config + global utilities (`.placeholder-box`, etc.).

## Environment
- Required env vars in `.env`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Dev: `npm run dev`

## Supabase Setup
1. Auth: Add `http://localhost:3000` (and production URL later) to allowed URLs.
2. Database tables: see `supabase/schema.sql` (services, products, carts, orders, bookings, newsletter, etc.). Align column types with current inserts (e.g. bookings expect `service_id` text, orders store JSON `items`).
3. Policies: enable RLS on user tables (`bookings`, `orders`) so users can read/write their own rows.

## Open Decisions
- Imagery: replace placeholder boxes with final photography/renders.
- Social links: footer anchors use `#`; wire real URLs when available.
- Schema alignment: confirm Supabase columns (especially `bookings.service_id`, `orders.items`) before production.

## Next Up (high priority)
- Add before/after slider component on Services page with real photos.
- Populate hero/product/service sections with final responsive imagery (desktop + mobile crops).
- Continue mobile QA after slider/photos to ensure load/perf is solid.
- Bug roundup: track/close remaining copy or encoding issues once new assets land.

## Backlog / Enhancements
- Product detail pages and simple filtering on `/products`.
- Newsletter double opt-in flow; expose confirmation state in UI.
- Micro-interactions (page transitions, hover states, skeleton loaders).
- Deploy to Vercel; add preview/staging environment.

## Quick Test Steps
1. Set Supabase env vars; run `npm run dev`.
2. Visit `/login`; create an account; confirm email if required.
3. Add items to cart, complete checkout; verify order recorded in Supabase (or local fallback).
4. Visit `/services`, open a card, tap Book Now; ensure booking form preselects service.
5. Seed orders via `/admin/seed`; confirm admin status dropdown updates persist.

## Useful Links
- Figma: https://www.figma.com/design/A7VSVh0E6XQROipulfzEmf/Project-Proposal-Mockup-Benny?node-id=0-1
- Next.js Docs: https://nextjs.org/docs
- Supabase Auth: https://supabase.com/docs/guides/auth