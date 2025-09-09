"use client";

import { useState } from "react";
import Link from "next/link";

const SERVICES = [
  {
    id: "switch-replacement",
    title: "Switch Replacement",
    blurb:
      "Upgrade worn or inconsistent switches with high‑quality parts for crisp, reliable clicks.",
    details:
      "We desolder old switches and install premium replacements, then test for debounce and feel.",
    price: "$29.00+",
  },
  {
    id: "weight-reduction",
    title: "Weight Reduction Mod",
    blurb: "Remove excess shell plastic to reduce grams without sacrificing durability.",
    details:
      "Custom internal cutouts and lightweight hardware tuned for balance and strength.",
    price: "$39.00+",
  },
  {
    id: "paracord-upgrade",
    title: "Paracord Cable Upgrade",
    blurb: "Ultra‑flexible paracord for drag‑free movement and better feel.",
    details:
      "We replace the stock cable, route strain relief, and validate sensor tracking.",
    price: "$19.00+",
  },
  {
    id: "wireless-conversion",
    title: "Cable → Wireless Conversion",
    blurb: "Convert your wired mouse to wireless with long‑lasting battery.",
    details:
      "Includes internal board, battery placement, and fitment of a lightweight shell if needed.",
    price: "$89.00+",
  },
  {
    id: "grip-tape",
    title: "Grip Tape Application",
    blurb: "Custom‑cut grip tape applied for consistent control.",
    details:
      "Choose from multiple textures; we trim and apply to match your hand placement.",
    price: "$12.00",
  },
  {
    id: "skate-install",
    title: "Skate Install (PTFE/Glass)",
    blurb: "Install and level premium skates for smooth glide.",
    details:
      "We remove residue, align new skates, and check glide and sensor height.",
    price: "$10.00",
  },
];

export default function ServicesPage() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const show = (svc) => {
    setActive(svc);
    setOpen(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Services</h1>
      <p className="mt-2 text-neutral-600">
        Explore our modification services. Click any card to view details and book an appointment.
      </p>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            onClick={() => show(s)}
            className="text-left bg-white rounded-md border overflow-hidden hover:shadow-sm hover:-translate-y-0.5 transition duration-150"
          >
            <div className="aspect-[4/3] placeholder-box">
              <span className="relative z-10 text-sm">PLACEHOLDER</span>
            </div>
            <div className="p-4">
              <div className="font-semibold text-sm">{s.title}</div>
              <div className="mt-1 text-sm text-neutral-600">{s.blurb}</div>
              <div className="mt-2 text-xs text-neutral-500">Starting at {s.price}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Dialog */}
        <div
          role="dialog"
          aria-label={active?.title ?? "Service details"}
          className={`absolute left-1/2 top-16 -translate-x-1/2 w-[min(640px,92vw)] bg-white rounded-lg border shadow-lg overflow-hidden transition-transform ${
            open ? "scale-100" : "scale-95"
          }`}
        >
          {active && (
            <div>
              <div className="aspect-[4/3] placeholder-box">
                <span className="relative z-10 text-sm">PLACEHOLDER</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{active.title}</h3>
                    <div className="text-sm text-neutral-500">From {active.price}</div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-md border w-8 h-8 grid place-items-center hover:bg-neutral-50"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
                <p className="mt-3 text-neutral-700 text-sm">{active.details}</p>
                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/book?service=${active.id}`}
                    className="rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800"
                    onClick={() => setOpen(false)}
                  >
                    Book Now
                  </Link>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-md border text-sm px-4 py-2 hover:bg-neutral-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
