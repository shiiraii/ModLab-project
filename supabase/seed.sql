-- Seed some demo data (Week 1)

insert into public.services (slug, name, description, price_cents)
values
  ('switch-replace', 'Switch Replacement', 'Replace worn switches with high-quality parts.', 3500),
  ('weight-reduction', 'Weight Reduction', 'Remove excess shell plastic to reduce weight.', 5000),
  ('paracord-upgrade', 'Paracord Cable Upgrade', 'Ultra-flexible paracord for drag-free movement.', 2500)
on conflict (slug) do nothing;

insert into public.products (slug, name, description, price_cents, stock, category, highlight, image_path, active)
values
  (
    'ptfe-skates',
    'PTFE Skates',
    'Ultra-smooth glide skates for precise movement.',
    1099,
    48,
    'skates',
    'primary',
    '/images/PTFE-skates.jpg',
    true
  ),
  (
    'glass-skates',
    'Glass Skates',
    'Durable glass skates for consistent glide.',
    1499,
    24,
    'skates',
    'secondary',
    '/images/GlassSkates.png',
    true
  ),
  (
    'grip-tape',
    'Grip Tape Set',
    'High-quality grip tape in multiple textures.',
    799,
    120,
    'accessories',
    null,
    '/images/grip-tape.jpg',
    true
  ),
  (
    'paracord-cable',
    'Paracord Mouse Cable',
    'Ultra-flexible paracord cable for drag-free movement.',
    1299,
    37,
    'cables',
    null,
    '/images/ViperMiniParacord.jpg',
    true
  ),
  (
    'wireless-dongle',
    '4K/8K Wireless Dongle',
    'Low-latency wireless upgrade with 4K and 8K polling support.',
    2499,
    15,
    'wireless',
    null,
    '/images/4k-8k-wireless-dongle.jpg',
    true
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  price_cents = excluded.price_cents,
  stock = excluded.stock,
  category = excluded.category,
  highlight = excluded.highlight,
  image_path = excluded.image_path,
  active = true;

insert into public.newsletter_subscriptions (email, confirmed)
values ('demo@modlab.test', true)
on conflict do nothing;
