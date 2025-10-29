"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "../../../lib/supabase/client";
import { useProductCatalog } from "../../../lib/products/catalog";

const ORDER_BLUEPRINTS = [
  {
    status: "processing",
    items: [
      { id: "ptfe-skates", qty: 1 },
      { id: "glass-skates", qty: 2 },
    ],
  },
  {
    status: "shipped",
    items: [{ id: "paracord-cable", qty: 1 }],
  },
  {
    status: "delivered",
    items: [{ id: "wireless-dongle", qty: 1 }],
  },
];

export default function SeedPage() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { products, loading: catalogLoading } = useProductCatalog();

  const productMap = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);

  useEffect(() => {
    const s = getSupabase();
    if (!s) return;
    s.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
  }, []);

  function buildItems(blueprint) {
    return blueprint.items
      .map(({ id, qty }) => {
        const product = productMap.get(id) ?? products[0] ?? null;
        if (!product) return null;
        return {
          id: product.id,
          name: product.name,
          unit_price: product.price,
          qty,
        };
      })
      .filter(Boolean);
  }

  async function seed() {
    setMsg(null);
    setLoading(true);
    try {
      const s = getSupabase();
      if (!s || !user) {
        setMsg("Sign in and ensure Supabase is configured.");
        return;
      }
      if (products.length === 0) {
        setMsg("No products available yet. Add products before seeding orders.");
        return;
      }

      const payloads = ORDER_BLUEPRINTS.map((blueprint) => {
        const items = buildItems(blueprint);
        const total = items.reduce((sum, item) => sum + item.unit_price * item.qty, 0);
        return {
          status: blueprint.status,
          total_cents: total,
          items,
          shipping: {
            name: "Demo User",
            address: "123 Main",
            city: "Town",
            state: "CA",
            zip: "94016",
            email: user.email,
          },
          user_id: user.id,
        };
      });

      const { error } = await s.from("orders").insert(payloads);
      if (error) throw error;
      setMsg("Seeded 3 demo orders for your account.");
    } catch (err) {
      setMsg(err.message ?? "Failed to seed orders.");
    } finally {
      setLoading(false);
    }
  }

  const buttonDisabled = loading || catalogLoading || !user || products.length === 0;

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Seed Demo Orders</h1>
      {!user ? (
        <div className="mt-4 text-sm text-neutral-700">Please sign in first.</div>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-neutral-600">
            This creates three example orders for your current account in Supabase using the latest product catalog.
          </p>
          {catalogLoading && <div className="text-xs text-neutral-500">Loading products...</div>}
          <button
            onClick={seed}
            disabled={buttonDisabled}
            className="rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800 disabled:opacity-60"
          >
            {loading ? "Seeding..." : "Create demo orders"}
          </button>
          {products.length === 0 && !catalogLoading && (
            <div className="text-xs text-neutral-600">
              Add products in Supabase (slug, name, price) so the demo orders include the right items.
            </div>
          )}
          {msg && <div className="text-sm text-neutral-700">{msg}</div>}
        </div>
      )}
    </div>
  );
}
