"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "../../../lib/supabase/client";
import { PRODUCTS } from "../../../lib/products/data";

function sampleItems() {
  return [
    { id: PRODUCTS[0].id, name: PRODUCTS[0].name, unit_price: PRODUCTS[0].price, qty: 1 },
    { id: PRODUCTS[1].id, name: PRODUCTS[1].name, unit_price: PRODUCTS[1].price, qty: 2 },
  ];
}

export default function SeedPage() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const s = getSupabase();
    if (!s) return;
    s.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
  }, []);

  async function seed() {
    setMsg(null);
    setLoading(true);
    try {
      const s = getSupabase();
      if (!s || !user) {
        setMsg("Sign in and ensure Supabase is configured.");
        return;
      }
      const payloads = [
        { status: "processing", total_cents: 1099 + 2 * 1499, items: sampleItems(), shipping: { name: "Demo User", address: "123 Main", city: "Town", state: "CA", zip: "94016", email: user.email } },
        { status: "shipped", total_cents: 1299, items: [{ id: "paracord-cable", name: "Paracord Mouse Cable", unit_price: 1299, qty: 1 }], shipping: { name: "Demo User", address: "123 Main", city: "Town", state: "CA", zip: "94016", email: user.email } },
        { status: "delivered", total_cents: 2499, items: [{ id: "wireless-dongle", name: "4K/8K Wireless Dongle", unit_price: 2499, qty: 1 }], shipping: { name: "Demo User", address: "123 Main", city: "Town", state: "CA", zip: "94016", email: user.email } },
      ].map((p) => ({ ...p, user_id: user.id }));
      const { error } = await s.from("orders").insert(payloads);
      if (error) throw error;
      setMsg("Seeded 3 demo orders for your account.");
    } catch (err) {
      setMsg(err.message ?? "Failed to seed orders.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Seed Demo Orders</h1>
      {!user ? (
        <div className="mt-4 text-sm text-neutral-700">Please sign in first.</div>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-neutral-600">This creates three example orders for your current account in Supabase.</p>
          <button onClick={seed} disabled={loading} className="rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800 disabled:opacity-60">
            {loading ? "Seeding…" : "Create demo orders"}
          </button>
          {msg && <div className="text-sm text-neutral-700">{msg}</div>}
        </div>
      )}
    </div>
  );
}

