"use client";

import { useCart } from "../lib/cart/store";
import { toast } from "../lib/ui/toast";

export default function AddToCartButton({ id, label = "Add To Cart", className = "", disabled = false }) {
  const cart = useCart();
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        cart.add(id, 1);
        toast("Added to cart");
      }}
      className={`inline-flex items-center rounded-md bg-black text-white text-sm px-4 py-2 ${
        disabled ? "cursor-not-allowed opacity-60" : "hover:bg-neutral-800"
      } ${className}`}
    >
      {label}
    </button>
  );
}
