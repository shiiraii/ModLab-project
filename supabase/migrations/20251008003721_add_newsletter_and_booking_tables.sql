-- Create table to store public newsletter signups captured from the site
create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz not null default now()
);

alter table public.newsletter_signups enable row level security;

create policy "Allow public inserts for newsletter"
on public.newsletter_signups
for insert
to public
with check (true);

create index if not exists idx_newsletter_signups_email
on public.newsletter_signups (email);


-- Store booking requests that come from the public booking form.
create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  service_slug text,
  full_name text not null,
  email text not null,
  phone text,
  notes text,
  scheduled_for timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.booking_requests enable row level security;

create policy "Allow public inserts for booking requests"
on public.booking_requests
for insert
to public
with check (true);

create policy "Users can view their booking requests"
on public.booking_requests
for select
to authenticated
using (auth.uid() = user_id);

create index if not exists idx_booking_requests_email
on public.booking_requests (email);

create index if not exists idx_booking_requests_scheduled_for
on public.booking_requests (scheduled_for);
