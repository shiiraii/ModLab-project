"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../lib/cart/store";
import AuthMenu from "./AuthMenu";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const cart = useCart();

  return (
    <header className="bg-white/90 sticky top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          ModLab
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/services" className="hover:underline">
            Services
          </Link>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex"><AuthMenu /></span>
          <Link href="/cart" className="text-sm rounded-md border px-3 py-1.5 hover:bg-neutral-50">
            Cart ({cart.count})
          </Link>
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={toggle}
            className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border hover:bg-neutral-50"
          >
            <span className="i">☰</span>
          </button>
        </div>
      </div>

      {/* Drawer */}
      <div
        className={`sm:hidden fixed inset-0 z-50 transition ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white border-l shadow-lg p-4 transition-transform duration-200 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-label="Navigation Menu"
        >
          <div className="flex items-center justify-between h-10">
            <div className="font-semibold">Menu</div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md border w-8 h-8 grid place-items-center hover:bg-neutral-50"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <div className="mt-4 grid gap-2 text-sm">
            <Link href="/" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 hover:bg-neutral-50">
              Home
            </Link>
            <Link href="/services" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 hover:bg-neutral-50">
              Services
            </Link>
            <Link href="/products" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 hover:bg-neutral-50">
              Products
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 hover:bg-neutral-50">
              About Us
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 hover:bg-neutral-50">
              Cart ({cart.count})
            </Link>
            <AuthMenu compact onClickItem={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
}
