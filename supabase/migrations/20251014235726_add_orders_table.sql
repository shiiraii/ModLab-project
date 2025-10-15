-- Orders capture checkout submissions with embedded line items and shipping info
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'processing',
  total_cents integer not null check (total_cents >= 0),
  items jsonb not null default '[]'::jsonb,
  shipping jsonb,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can insert their own orders"
on public.orders
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can view their own orders"
on public.orders
for select
to authenticated
using (auth.uid() = user_id);

create policy "Admins can view all orders"
on public.orders
for select
to authenticated
using (coalesce(auth.jwt()->'user_metadata'->>'role', '') = 'admin');

create policy "Admins can update orders"
on public.orders
for update
to authenticated
using (coalesce(auth.jwt()->'user_metadata'->>'role', '') = 'admin')
with check (coalesce(auth.jwt()->'user_metadata'->>'role', '') = 'admin');

create index if not exists idx_orders_created_at on public.orders (created_at desc);
