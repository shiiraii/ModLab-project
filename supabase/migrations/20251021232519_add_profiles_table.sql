create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can insert their profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update their profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create extension if not exists moddatetime schema extensions;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure extensions.moddatetime (updated_at);
