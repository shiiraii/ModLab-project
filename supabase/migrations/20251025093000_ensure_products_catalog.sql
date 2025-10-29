create extension if not exists "pgcrypto";
create extension if not exists moddatetime schema extensions;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  price_cents integer default 0 check (price_cents >= 0),
  stock integer default 0 check (stock >= 0),
  category text,
  highlight text,
  image_path text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.products
  alter column price_cents set default 0,
  alter column stock set default 0,
  alter column active set default true;

alter table public.products
  add column if not exists category text,
  add column if not exists highlight text,
  add column if not exists image_path text,
  add column if not exists active boolean default true,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

update public.products set price_cents = coalesce(price_cents, 0);
update public.products set stock = coalesce(stock, 0);
update public.products set active = coalesce(active, true);
update public.products set created_at = coalesce(created_at, now());
update public.products set updated_at = coalesce(updated_at, now());

alter table public.products
  alter column price_cents set not null,
  alter column stock set not null,
  alter column active set not null,
  alter column created_at set not null,
  alter column updated_at set not null;

alter table public.products enable row level security;

drop trigger if exists update_products_updated_at on public.products;
create trigger update_products_updated_at
  before update on public.products
  for each row execute procedure extensions.moddatetime (updated_at);

drop policy if exists "Public can view products" on public.products;
drop policy if exists "Admins manage products" on public.products;

create policy "Public can view products"
on public.products
for select
to anon, authenticated
using (active);

create policy "Admins manage products"
on public.products
for all
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);
