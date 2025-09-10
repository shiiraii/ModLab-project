"use client";

import Link from "next/link";
import { useCart } from "../../lib/cart/store";
import { PRODUCTS, formatPrice } from "../../lib/products/data";

function resolveProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export default function CartPage() {
  const cart = useCart();
  const enriched = cart.items
    .map((it) => ({ ...it, product: resolveProduct(it.id) }))
    .filter((it) => it.product);
  const subtotal = enriched.reduce((n, it) => n + it.product.price * it.qty, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Your Cart</h1>
      {enriched.length === 0 ? (
        <div className="mt-6 text-neutral-600 text-sm">
          Your cart is empty. <Link href="/products" className="underline">Browse products</Link>.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6">
          <ul className="divide-y rounded-md border bg-white">
            {enriched.map((it) => (
              <li key={it.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium">{it.product.name}</div>
                  <div className="text-sm text-neutral-600">{formatPrice(it.product.price)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => cart.setQty(it.id, Math.max(1, Number(e.target.value || 1)))}
                    className="w-16 rounded-md border px-2 py-1 text-sm"
                  />
                  <button onClick={() => cart.remove(it.id)} className="text-sm rounded-md border px-3 py-1.5 hover:bg-neutral-50">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-600">Subtotal</div>
            <div className="text-lg font-semibold">{formatPrice(subtotal)}</div>
          </div>
          <div className="flex gap-3">
            <Link href="/checkout" className="rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800">
              Checkout
            </Link>
            <Link href="/products" className="rounded-md border text-sm px-4 py-2 hover:bg-neutral-50">
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

