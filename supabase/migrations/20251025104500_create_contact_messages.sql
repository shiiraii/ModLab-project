create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  email text not null,
  address text,
  city text,
  state text,
  postal_code text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create index if not exists idx_contact_messages_created_at
  on public.contact_messages (created_at desc);

drop policy if exists "Public can submit contact form" on public.contact_messages;
drop policy if exists "Admins can view contact form submissions" on public.contact_messages;

create policy "Public can submit contact form"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

create policy "Admins can view contact form submissions"
  on public.contact_messages
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.role = 'admin'
    )
  );
