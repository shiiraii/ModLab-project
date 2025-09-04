-- Seed some demo data (Week 1)

insert into public.services (slug, name, description, price_cents)
values
  ('switch-replace', 'Switch Replacement', 'Replace worn switches with high-quality parts.', 3500),
  ('weight-reduction', 'Weight Reduction', 'Remove excess shell plastic to reduce weight.', 5000),
  ('paracord-upgrade', 'Paracord Cable Upgrade', 'Ultra-flexible paracord for drag-free movement.', 2500)
on conflict (slug) do nothing;

insert into public.products (slug, name, description, price_cents, stock)
values
  ('ptfe-skates', 'PTFE Skates', 'Ultra-smooth glide skates for precise movement.', 1299, 100),
  ('glass-skates', 'Glass Skates', 'Durable glass skates for consistent glide.', 1999, 50),
  ('grip-tape', 'Grip Tape', 'High-quality grip tape in multiple textures.', 999, 200),
  ('dongle-4k', '4k Wireless Dongle', 'Low-latency wireless up to 4000Hz.', 2999, 30),
  ('dongle-8k', '8k Wireless Dongle', 'Future-proof wireless up to 8000Hz.', 4999, 20)
on conflict (slug) do nothing;

insert into public.newsletter_subscriptions (email, confirmed)
values ('demo@modlab.test', true)
on conflict do nothing;

