export const FALLBACK_PRODUCTS = [
  {
    id: "ptfe-skates",
    name: "PTFE Skates",
    price: 1099,
    description: "Durable skates designed for smooth, frictionless movement on any mouse pad.",
    image: "/images/PTFE-skates.jpg",
    category: "skates",
    highlight: "primary",
    stock: 48,
  },
  {
    id: "glass-skates",
    name: "Glass Skates",
    price: 1499,
    description: "Premium glass skates for maximum glide and long-lasting durability.",
    image: "/images/GlassSkates.png",
    category: "skates",
    highlight: "secondary",
    stock: 24,
  },
  {
    id: "grip-tape",
    name: "Grip Tape Set",
    price: 799,
    description: "Anti-slip textured grip tape to keep your aim steady during long sessions.",
    image: "/images/grip-tape.jpg",
    category: "accessories",
    stock: 120,
  },
  {
    id: "paracord-cable",
    name: "Paracord Mouse Cable",
    price: 1299,
    description: "Ultra-flexible, lightweight cable that eliminates drag and keeps your mouse feeling wireless.",
    image: "/images/ViperMiniParacord.jpg",
    category: "cables",
    stock: 37,
  },
  {
    id: "wireless-dongle",
    name: "4K/8K Wireless Dongle",
    price: 2499,
    description: "Upgrade to the latest low-latency wireless tech with support for ultra-high polling rates.",
    image: "/images/4k-8k-wireless-dongle.jpg",
    category: "wireless",
    stock: 15,
  },
];

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
