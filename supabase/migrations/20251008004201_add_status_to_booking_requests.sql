alter table public.booking_requests
  add column if not exists status text not null default 'pending';
