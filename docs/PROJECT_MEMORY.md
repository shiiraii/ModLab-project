# ModLab Project Memory

Single source of truth to resume work quickly. Update this at the end of each session.

## Overview
- Stack: Next.js 14 (App Router), Tailwind v4, Supabase (auth + DB)
- Current focus (Week 4): polish mobile UX, wire final imagery, add customer trackers, close remaining UX bugs.

## Current State (implemented)
- Layout/header/footer: `app/layout.js` with responsive SiteHeader drawer, toast + cart provider, social/footer grid; header/footer now link to order + booking trackers.
- Home: `app/page.js` now shows real photos (hero, services, accessories, booking). Paracord + wireless cards use the shared carousel; weight-reduction and switch replacement cards updated.
- Services: `app/services/page.js` responsive grid with modal details, deep link to `/book?service={id}`, per-service imagery/galleries, and grip tape availability messaging.
- Products: `app/products/page.js` renders product photos for PTFE skates, grip tape set, paracord cable, wireless dongle; feature list and cart buttons intact.
- Trackers: `/track/order` checks order status via Supabase (with local fallback) and `/track/booking` lists bookings by email; `/track` hub page added.
- About: `app/about/page.js` split intro layout plus lead capture form (name, address, email, message).
- Auth: `app/login/page.js` Supabase email/password sign in + sign up (stores `full_name` metadata).
- Booking: `app/book/page.js` gated by auth, inserts into Supabase `bookings` table; preselect via query string.
- Cart/Checkout: client cart store with localStorage persistence, checkout form pushes Supabase `orders` (or local fallback).
- Account: `/account/orders` lists user orders; `/account/orders/[id]` shows detail stepper; admin routes manage orders + seeding.
- Supabase client: `lib/supabase/client.js` handles lazy singleton, safe null when env vars missing.
- UI utilities: Tailwind config + global utilities (`.placeholder-box`, etc.), plus `components/ImageCarousel.jsx` for before/after sliders.

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
- Imagery: remaining placeholders (e.g. glass skates, services without photos) still need final photos.
- Social links: footer anchors use `#`; wire real URLs when available.
- Schema alignment: confirm Supabase columns (especially `bookings.service_id`, `orders.items`) before production.
- Carousel polish: consider keyboard support + swipe gestures if timeline allows.
- Tracker auth: decide whether to limit order/booking lookups to authenticated users or require additional verification.

## Next Up (high priority)
- Swap remaining placeholder imagery (glass skates, services without photos) with final assets.
- QA the new image carousels and trackers on touch + screen readers; refine controls if needed.
- Update marketing copy where new offerings were added (grip tape availability note now in place—verify elsewhere).
- Continue mobile regression pass after media + tracker additions; monitor performance and Supabase error handling.

## Backlog / Enhancements
- Product detail pages and simple filtering on `/products`.
- Newsletter double opt-in flow; expose confirmation state in UI.
- Micro-interactions (page transitions, hover states, skeleton loaders).
- Deploy to Vercel; add preview/staging environment.

## Quick Test Steps
1. Set Supabase env vars; run `npm run dev`.
2. Visit `/login`; create an account; confirm email if required.
3. Add items to cart, complete checkout; verify order recorded in Supabase (or local fallback).
4. Visit `/services`, open paracord + wireless modals; cycle carousel, confirm copy and close actions.
5. Try `/track/order` with a recent Supabase order (and local fallback) plus `/track/booking` with a known email.

## Useful Links
- Figma: https://www.figma.com/design/A7VSVh0E6XQROipulfzEmf/Project-Proposal-Mockup-Benny?node-id=0-1
- Next.js Docs: https://nextjs.org/docs
- Supabase Auth: https://supabase.com/docs/guides/auth
