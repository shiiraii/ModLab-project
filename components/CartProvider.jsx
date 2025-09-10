"use client";

import { CartProvider as InternalCartProvider } from "../lib/cart/store";

export default function CartProvider({ children }) {
  return <InternalCartProvider>{children}</InternalCartProvider>;
}

