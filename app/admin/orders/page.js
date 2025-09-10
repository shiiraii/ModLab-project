"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "../../../lib/supabase/client";
import { formatPrice } from "../../../lib/products/data";

const STATUSES = ["processing", "shipped", "delivered"];

export default function AdminOrdersPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const s = getSupabase();
    if (!s) return;
    s.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
  }, []);

  async function load() {
    const s = getSupabase();
    if (!s) return;
    const { data, error } = await s
      .from("orders")
      .select("id, created_at, status, total_cents")
      .order("created_at", { ascending: false });
    if (error) setErr(error.message);
    else setOrders(data);
  }

  useEffect(() => {
    load();
  }, [user]);

  const isAdmin = user?.user_metadata?.role === "admin";

  async function updateStatus(id, status) {
    const s = getSupabase();
    if (!s) return;
    const { error } = await s.from("orders").update({ status }).eq("id", id);
    if (error) setErr(error.message);
    await load();
  }

  if (!user) return <div className="mx-auto max-w-4xl px-4 py-10">Please sign in.</div>;
  if (!isAdmin) return <div className="mx-auto max-w-4xl px-4 py-10">Not authorized. Add role: "admin" in your Supabase user metadata.</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">All Orders (Admin)</h1>
      {err && <div className="mt-2 text-sm text-red-600">{err}</div>}
      {orders === null ? (
        <div className="mt-4 text-sm text-neutral-600">Loading…</div>
      ) : orders.length === 0 ? (
        <div className="mt-4 text-sm text-neutral-700">No orders found.</div>
      ) : (
        <ul className="mt-6 divide-y rounded-md border bg-white">
          {orders.map((o) => (
            <li key={o.id} className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5">
                <div className="font-medium">Order #{o.id.slice(0, 8)}</div>
                <div className="text-sm text-neutral-600">{new Date(o.created_at).toLocaleString()}</div>
              </div>
              <div className="md:col-span-3 font-semibold">{formatPrice(o.total_cents)}</div>
              <div className="md:col-span-2">
                <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="w-full rounded-md border px-2 py-1.5 text-sm bg-white">
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 text-right">
                <Link href={`/account/orders/${o.id}`} className="text-sm underline">View</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

