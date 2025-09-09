# ModLab Project Memory

Single source of truth to resume work quickly. Update this at the end of each session.

## Overview
- Stack: Next.js 14 (App Router), Tailwind v4, Supabase (auth + DB)
- Goal (Weeks 3–4): Front‑end pages, responsive nav, lead form, initial interactions, and auth start.

## Current State (implemented)
- Layout/header/footer: `app/layout.js` with mobile drawer header in `components/SiteHeader.jsx` and socials in footer.
- Home: `app/page.js` — hero, featured services, shop section, booking preview; consistent placeholder visuals.
- About: `app/about/page.js` — two‑column intro; contact/lead form with name, address, email, message.
- Services: `app/services/page.js` — responsive grid, hover effects, detail modal; “Book Now” links to `/book?service={id}`.
- Products: `app/products/page.js` — dark hero, featured products, other products grid, features list.
- Login/Register: `app/login/page.js` — Supabase email/password sign in + sign up (stores `full_name` in metadata).
- Booking: `app/book/page.js` — requires login, form inserts a booking into Supabase `bookings` table.
- Supabase client: `lib/supabase/client.js` using env vars from `.env` (see `.env.example`).
- Styling: Tailwind configured via `tailwind.config.js`, `postcss.config.js`, global styles in `app/globals.css` (includes `.placeholder-box`).

## Environment
- Required env vars in `.env`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Dev: `npm run dev`

## Supabase Setup
1) Auth: Add `http://localhost:3000` (and production URL later) to allowed URLs.
2) Database table for bookings:

```sql
-- Enable pgcrypto if not already
create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid references auth.users(id) on delete cascade,
  service_id text,
  name text,
  email text,
  phone text,
  notes text,
  appointment_at timestamptz
);

alter table public.bookings enable row level security;

-- Policies
create policy "Users can insert their own bookings" on public.bookings
  for insert with check (auth.uid() = user_id);

create policy "Users can select their own bookings" on public.bookings
  for select using (auth.uid() = user_id);
```

## Open Decisions
- Images: using placeholders for now; replace with final assets later.
- Social links: placeholders (`#`) in footer; add real URLs later.

## Next Up (high priority)
- Cart + checkout simulation (products → cart → summary page).
- Account area: show profile and list user bookings/orders; add sign‑out button.
- Product detail pages and simple filters on `/products`.
- Newsletter signup (can store emails in `newsletter_subscribers`).

## Backlog / Enhancements
- Before/after slider component for modded mice (Framer Motion).
- Page transitions/animations polish.
- Replace placeholder images and fine‑tune typography.
- Add skeleton loaders and client‑side filters.
- Deploy to Vercel; add preview environment.

## Quick Test Steps
1) Set `.env` values; run `npm run dev`.
2) Visit `/login`; sign up; confirm email if required.
3) Visit `/services`; open a service → Book Now → lands on `/book` with preselected service; submit booking.
4) Check Supabase table `bookings` for new row.

## Useful Links
- Figma: https://www.figma.com/design/A7VSVh0E6XQROipulfzEmf/Project-Proposal-Mockup-Benny?node-id=0-1
- Next.js Docs: https://nextjs.org/docs
- Supabase Auth: https://supabase.com/docs/guides/auth

