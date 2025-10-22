drop policy if exists "Allow public inserts for booking requests" on public.booking_requests;
drop policy if exists "Users can view their booking requests" on public.booking_requests;

create policy "Users can insert bookings" 
on public.booking_requests
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can select their bookings"
on public.booking_requests
for select
to authenticated
using (auth.uid() = user_id);

create policy "Admins can select all bookings"
on public.booking_requests
for select
to authenticated
using (coalesce(auth.jwt()->'user_metadata'->>'role', '') = 'admin');

create policy "Admins can update bookings"
on public.booking_requests
for update
to authenticated
using (coalesce(auth.jwt()->'user_metadata'->>'role', '') = 'admin')
with check (true);
