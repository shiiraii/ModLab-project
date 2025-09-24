"use client";

import { useState } from "react";
import { getSupabase } from "../../../lib/supabase/client";
import { formatPrice } from "../../../lib/products/data";

const STORAGE_KEY = "modlab_orders_v1";

function normalizeOrderId(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const numeric = Number(trimmed);
  if (!Number.isNaN(numeric)) return numeric;
  return trimmed;
}

export default function OrderTrackerPage() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  async function lookupOrder(idValue) {
    const supabase = getSupabase();
    const identifier = normalizeOrderId(idValue);
    if (!identifier) {
      return { error: "Enter your order ID to track it." };
    }

    if (supabase) {
      const query = supabase
        .from("orders")
        .select("id, status, created_at, total_cents, items, shipping")
        .eq("id", identifier)
        .maybeSingle();
      const { data, error } = await query;
      if (!error && data) {
        return { order: data };
      }
      if (error && error.code !== "PGRST116") {
        console.error("Supabase order lookup failed", error);
      }
    }

    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const orders = JSON.parse(raw);
          const localOrder = orders.find((o) => String(o.id) === String(idValue));
          if (localOrder) {
            return { order: localOrder, source: "local" };
          }
        }
      } catch (err) {
        console.warn("Local order lookup failed", err);
      }
    }

    return { error: "We couldn\'t find that order. Double-check the ID from your confirmation email." };
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setOrder(null);
    setLoading(true);
    const { order, error } = await lookupOrder(orderId);
    if (error) setError(error);
    if (order) setOrder(order);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Track Your Order</h1>
      <p className="mt-2 text-neutral-600 text-sm">
        Enter the order ID from your confirmation email to view the latest status and shipping details.
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Order ID"
          className="flex-1 rounded-md border px-3 py-2 text-sm bg-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800 disabled:opacity-60"
        >
          {loading ? "Searching..." : "Check Status"}
        </button>
      </form>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

      {order && (
        <div className="mt-6 space-y-4 rounded-md border bg-white p-5">
          <div className="flex flex-wrap justify-between gap-4 text-sm">
            <div>
              <div className="font-semibold">Order #{String(order.id).slice(0, 8)}</div>
              {order.created_at && (
                <div className="text-neutral-600">
                  Placed {new Date(order.created_at).toLocaleString()}
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-neutral-600">Status</div>
              <div className="font-semibold capitalize">{order.status ?? "processing"}</div>
            </div>
          </div>

          <div>
            <div className="font-medium mb-2 text-sm">Items</div>
            <ul className="divide-y text-sm">
              {(order.items || []).map((item) => (
                <li key={`${item.id}-${item.qty}`} className="py-2 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.name ?? item.id}</div>
                    <div className="text-xs text-neutral-500">Qty {item.qty}</div>
                  </div>
                  <div>{formatPrice(item.unit_price * item.qty)}</div>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between text-sm">
              <span className="text-neutral-600">Total</span>
              <span className="font-semibold">{formatPrice(order.total_cents ?? 0)}</span>
            </div>
          </div>

          <div>
            <div className="font-medium mb-2 text-sm">Shipping</div>
            {order.shipping ? (
              <div className="text-sm text-neutral-700 space-y-1">
                <div>{order.shipping.name}</div>
                <div>{order.shipping.address}</div>
                <div>
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                </div>
                <div>{order.shipping.email}</div>
              </div>
            ) : (
              <div className="text-sm text-neutral-600">Shipping details pending.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
