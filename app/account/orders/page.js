"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabase } from "../../../lib/supabase/client";
import { formatPrice } from "../../../lib/products/data";

export default function OrdersPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const s = getSupabase();
    if (!s) return;
    s.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
  }, []);

  useEffect(() => {
    const s = getSupabase();
    if (!s || !user) return;
    s.from("orders")
      .select("id, created_at, status, total_cents")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setErr(error.message);
        else setOrders(data);
      });
  }, [user]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">My Orders</h1>
      {!user ? (
        <div className="mt-4 text-sm text-neutral-700">
          Please <Link href="/login" className="underline">sign in</Link> to view your orders.
        </div>
      ) : err ? (
        <div className="mt-4 text-sm text-red-600">{err}</div>
      ) : orders === null ? (
        <div className="mt-4 text-sm text-neutral-600">Loading…</div>
      ) : orders.length === 0 ? (
        <div className="mt-4 text-sm text-neutral-700">No orders yet.</div>
      ) : (
        <ul className="mt-6 divide-y rounded-md border bg-white">
          {orders.map((o) => (
            <li key={o.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">Order #{o.id.slice(0, 8)}</div>
                <div className="text-sm text-neutral-600">{new Date(o.created_at).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm">Status: <span className="font-medium capitalize">{o.status}</span></div>
                <div className="font-semibold">{formatPrice(o.total_cents)}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

