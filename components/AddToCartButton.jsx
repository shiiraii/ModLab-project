"use client";

import { useCart } from "../lib/cart/store";
import { toast } from "../lib/ui/toast";

export default function AddToCartButton({ id, label = "Add To Cart", className = "" }) {
  const cart = useCart();
  return (
    <button
      type="button"
      onClick={() => {
        cart.add(id, 1);
        toast("Added to cart");
      }}
      className={
        "inline-flex items-center rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800 " +
        className
      }
    >
      {label}
    </button>
  );
}
