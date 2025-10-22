alter table public.profiles
  add column if not exists role text not null default 'user';

update public.profiles
set role = coalesce(role, 'user');

drop policy if exists "Users can insert their own orders" on public.orders;
drop policy if exists "Users can view their own orders" on public.orders;
drop policy if exists "Admins can view all orders" on public.orders;
drop policy if exists "Admins can update orders" on public.orders;

create policy "Users can insert their orders"
on public.orders
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can select their orders"
on public.orders
for select
to authenticated
using (auth.uid() = user_id);

create policy "Admins can select all orders"
on public.orders
for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);

create policy "Admins can update orders"
on public.orders
for update
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
