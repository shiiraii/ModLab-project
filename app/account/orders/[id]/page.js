"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "../../../../lib/supabase/client";
import { formatPrice } from "../../../../lib/products/data";

const STEPS = ["processing", "shipped", "delivered"];

function Stepper({ status }) {
  const idx = Math.max(0, STEPS.indexOf(status));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
      {STEPS.map((s, i) => (
        <div key={s} className={`rounded-md border px-3 py-2 text-center ${i <= idx ? "bg-black text-white" : "bg-white text-neutral-600"}`}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </div>
      ))}
    </div>
  );
}

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      const s = getSupabase();
      if (!s) {
        const raw = localStorage.getItem("modlab_orders_v1");
        const orders = raw ? JSON.parse(raw) : [];
        setOrder(orders.find((o) => o.id === id) || null);
        return;
      }
      const { data: session } = await s.auth.getUser();
      if (!session?.user) return;
      const { data, error } = await s
        .from("orders")
        .select("id, created_at, status, total_cents, items, shipping")
        .eq("id", id)
        .single();
      if (error) setError(error.message);
      else setOrder(data);
    }
    load();
  }, [id]);

  const total = useMemo(() => (order ? order.total_cents : 0), [order]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/account/orders" className="text-sm underline">
        < Back to orders
      </Link>
      <h1 className="mt-2 text-2xl font-semibold">Order #{String(id).slice(0, 8)}</h1>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
      {!order ? (
        <div className="mt-4 text-sm text-neutral-600">Loading...</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-md border bg-white p-4">
              <div className="font-medium mb-3">Status</div>
              <Stepper status={order.status || "processing"} />
            </div>
            <div className="rounded-md border bg-white p-4">
              <div className="font-medium mb-3">Items</div>
              <ul className="text-sm divide-y">
                {(order.items || []).map((li) => (
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
          <div className="space-y-4">
            <div className="rounded-md border bg-white p-4">
              <div className="font-medium mb-3">Shipping</div>
              {order.shipping ? (
                <div className="text-sm text-neutral-700">
                  <div>{order.shipping.name}</div>
                  <div>{order.shipping.address}</div>
                  <div>
                    {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                  </div>
                  <div className="mt-2">{order.shipping.email}</div>
                </div>
              ) : (
                <div className="text-sm text-neutral-600">Shipping details pending.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
