"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../lib/cart/store";
import { PRODUCTS, formatPrice } from "../../lib/products/data";
import { getSupabase } from "../../lib/supabase/client";
import { toast } from "../../lib/ui/toast";

function getLineItems(items) {
  return items
    .map((it) => {
      const product = PRODUCTS.find((p) => p.id === it.id);
      if (!product) return null;
      return { id: product.id, name: product.name, unit_price: product.price, qty: it.qty };
    })
    .filter(Boolean);
}

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const supabase = getSupabase();
  const supabaseAvailable = Boolean(supabase);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
  }, [supabase]);

  const lineItems = useMemo(() => getLineItems(cart.items), [cart.items]);
  const total = lineItems.reduce((n, li) => n + li.unit_price * li.qty, 0);

  async function placeOrder(e) {
    e.preventDefault();
    setMsg(null);
    if (lineItems.length === 0) {
      setMsg("Your cart is empty.");
      return;
    }
    setSaving(true);
    try {
      const form = new FormData(e.currentTarget);
      const shipping = {
        name: String(form.get("name") || ""),
        address: String(form.get("address") || ""),
        city: String(form.get("city") || ""),
        state: String(form.get("state") || ""),
        zip: String(form.get("zip") || ""),
        email: String(form.get("email") || ""),
      };

      let orderId = undefined;
      if (supabase && user) {
        const { data, error } = await supabase
          .from("orders")
          .insert({
            user_id: user.id,
            status: "processing",
            total_cents: total,
            items: lineItems,
            shipping,
          })
          .select("id")
          .single();
        if (error) throw error;
        orderId = data.id;
      } else {
        // Fallback local simulation
        orderId = `local_${Date.now()}`;
        try {
          const raw = localStorage.getItem("modlab_orders_v1");
          const orders = raw ? JSON.parse(raw) : [];
          orders.push({ id: orderId, status: "processing", total_cents: total, items: lineItems, created_at: new Date().toISOString(), shipping });
          localStorage.setItem("modlab_orders_v1", JSON.stringify(orders));
        } catch {
          // Ignore storage errors in simulation mode.
        }
      }

      cart.clear();
      toast("Order placed");
      router.push("/account/orders?placed=1" + (orderId ? `&id=${orderId}` : ""));
    } catch (err) {
      setMsg(err.message ?? "Could not place order.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      {!supabaseAvailable && (
        <div className="mt-4 rounded-md border bg-neutral-50 p-3 text-sm text-neutral-700">
          This is the front-end preview. Orders are saved locally so you can demonstrate checkout before wiring up Supabase.
        </div>
      )}
      {lineItems.length === 0 ? (
        <div className="mt-6 text-neutral-600 text-sm">Your cart is empty.</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <form onSubmit={placeOrder} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-700" htmlFor="name">
                Full name
              </label>
              <input id="name" name="name" required autoComplete="name" className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" />
            </div>
            <div>
              <label className="block text-sm text-neutral-700" htmlFor="email">
                Email
              </label>
              <input id="email" type="email" name="email" required autoComplete="email" className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" />
            </div>
            <div>
              <label className="block text-sm text-neutral-700" htmlFor="address">
                Address
              </label>
              <input id="address" name="address" required autoComplete="street-address" className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <input id="city" name="city" placeholder="City" required autoComplete="address-level2" className="rounded-md border px-3 py-2 text-sm bg-white" />
              <input id="state" name="state" placeholder="State" required autoComplete="address-level1" className="rounded-md border px-3 py-2 text-sm bg-white" />
              <input id="zip" name="zip" placeholder="ZIP" required autoComplete="postal-code" className="rounded-md border px-3 py-2 text-sm bg-white" />
            </div>
            <div>
              <label className="block text-sm text-neutral-700" htmlFor="card">
                Card (simulation)
              </label>
              <input id="card" placeholder="4111 1111 1111 1111" className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" />
            </div>
            <button disabled={saving} className="rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800 disabled:opacity-60">
              {saving ? "Placing order..." : `Place Order (${formatPrice(total)})`}
            </button>
            {msg && <div className="text-sm text-neutral-700">{msg}</div>}
          </form>

          <div className="rounded-md border bg-white p-4">
            <div className="font-medium mb-3">Order Summary</div>
            <ul className="text-sm divide-y">
              {lineItems.map((li) => (
                <li key={li.id} className="py-2 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{li.name}</div>
                    <div className="text-xs text-neutral-500">Qty {li.qty}</div>
                  </div>
                  <div>{formatPrice(li.unit_price * li.qty)}</div>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-neutral-600">Total</div>
              <div className="text-lg font-semibold">{formatPrice(total)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}