export const PRODUCTS = [
  { id: "ptfe-skates", name: "PTFE Skates", price: 1099 },
  { id: "glass-skates", name: "Glass Skates", price: 1499 },
  { id: "grip-tape", name: "Grip Tape Set", price: 799 },
  { id: "paracord-cable", name: "Paracord Mouse Cable", price: 1299 },
  { id: "wireless-dongle", name: "4K/8K Wireless Dongle", price: 2499 },
];

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

