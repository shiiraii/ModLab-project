-- Supabase schema for ModLab (Week 1)
-- Note: In Supabase, `auth.users` is managed by Supabase Auth.

create schema if not exists public;

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Services offered
create table if not exists public.services (
  id bigserial primary key,
  slug text unique not null,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  active boolean default true,
  created_at timestamptz default now()
);

-- Products for shop
create table if not exists public.products (
  id bigserial primary key,
  slug text unique not null,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  stock integer not null default 0 check (stock >= 0),
  active boolean default true,
  created_at timestamptz default now()
);

-- Carts (one active cart per user typically)
create table if not exists public.carts (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'active', -- active|ordered|abandoned
  created_at timestamptz default now()
);

-- Items in carts
create table if not exists public.cart_items (
  id bigserial primary key,
  cart_id bigint references public.carts(id) on delete cascade,
  product_id bigint references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0)
);

-- Orders
create table if not exists public.orders (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete set null,
  total_cents integer not null check (total_cents >= 0),
  status text not null default 'processing', -- processing|shipped|delivered|cancelled
  created_at timestamptz default now()
);

-- Order items
create table if not exists public.order_items (
  id bigserial primary key,
  order_id bigint references public.orders(id) on delete cascade,
  product_id bigint references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  price_cents integer not null check (price_cents >= 0)
);

-- Service bookings
create table if not exists public.bookings (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete set null,
  service_id bigint references public.services(id) on delete restrict,
  scheduled_for timestamptz not null,
  notes text,
  status text not null default 'pending', -- pending|confirmed|completed|cancelled
  created_at timestamptz default now()
);

-- Newsletter subscriptions
create table if not exists public.newsletter_subscriptions (
  id bigserial primary key,
  email text unique not null,
  created_at timestamptz default now(),
  confirmed boolean default false
);

-- Helpful indexes
create index if not exists idx_cart_items_cart on public.cart_items(cart_id);
create index if not exists idx_order_items_order on public.order_items(order_id);
create index if not exists idx_bookings_user on public.bookings(user_id);
create index if not exists idx_bookings_service on public.bookings(service_id);

