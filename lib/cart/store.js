"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "modlab_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id, qty}]

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const api = useMemo(() => {
    return {
      items,
      count: items.reduce((n, it) => n + it.qty, 0),
      add(id, qty = 1) {
        setItems((prev) => {
          const idx = prev.findIndex((p) => p.id === id);
          if (idx === -1) return [...prev, { id, qty }];
          const copy = prev.slice();
          copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
          return copy;
        });
      },
      setQty(id, qty) {
        setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)).filter((p) => p.qty > 0));
      },
      remove(id) {
        setItems((prev) => prev.filter((p) => p.id !== id));
      },
      clear() {
        setItems([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

