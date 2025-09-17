"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImageCarousel from "../../components/ImageCarousel";

const SERVICES = [
  {
    id: "switch-replacement",
    title: "Switch Replacement",
    blurb: "Upgrade worn or inconsistent switches with high-quality parts for crisp, reliable clicks.",
    details:
      "We desolder old switches and install premium replacements, then test for debounce and feel.",
    price: "$29.00+",
    image: "/images/switch-replacement.jpg",
    alt: "Top-down view of a custom mouse with freshly installed switch mod",
  },
  {
    id: "weight-reduction",
    title: "Weight Reduction Mod",
    blurb: "Remove excess shell plastic to reduce grams without sacrificing durability.",
    details:
      "Custom internal cutouts and lightweight hardware tuned for balance and strength.",
    price: "$39.00+",
    image: "/images/weight-reduction.jpg",
    alt: "Profile view of a lightweight modded mouse shell on a cutting mat",
  },
  {
    id: "paracord-upgrade",
    title: "Paracord Cable Upgrade",
    blurb: "Ultra-flexible paracord for drag-free movement and better feel.",
    details:
      "We replace the stock cable, route strain relief, and validate sensor tracking.",
    price: "$19.00+",
    gallery: [
      {
        src: "/images/Before-Paracord.jpg",
        alt: "Stock mouse cable before paracord upgrade",
        label: "Before",
      },
      {
        src: "/images/After-Paracord.jpg",
        alt: "Finished paracord cable upgrade with flexible cable",
        label: "After",
      },
    ],
  },
  {
    id: "wireless-conversion",
    title: "Cable to Wireless Conversion",
    blurb: "Convert your wired mouse to wireless with a long-lasting battery upgrade.",
    details:
      "Includes internal board, battery placement, and fitment of a lightweight shell if needed.",
    price: "$89.00+",
    gallery: [
      {
        src: "/images/Before-WirelessConversion.jpg",
        alt: "Mouse before the wireless conversion",
        label: "Before",
      },
      {
        src: "/images/After-WirelessConversion.jpg",
        alt: "Completed wireless conversion with clean exterior",
        label: "After",
      },
      {
        src: "/images/After-WirelessConversion-Open.jpg",
        alt: "Interior view of the wireless conversion showing installed components",
        label: "Inside",
      },
    ],
  },
  {
    id: "grip-tape",
    title: "Grip Tape Application",
    blurb: "Custom-cut grip tape applied for consistent control.",
    details:
      "Choose from multiple textures; we trim and apply to match your hand placement. Only available when booking another service.",
    price: "$12.00",
    image: "/images/grip-tape.jpg",
    alt: "Close-up of grip tape applied to a gaming mouse",
  },
  {
    id: "skate-install",
    title: "Skate Install (PTFE/Glass)",
    blurb: "Install and level premium skates for smooth glide.",
    details:
      "We remove residue, align new skates, and check glide and sensor height.",
    price: "$10.00",
    image: "/images/FullPTFE-Skates.jpg",
    alt: "Mouse underside showcasing freshly installed PTFE skates",
  },
];

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ServiceIllustration({ image, gallery, alt, sizes = "100vw", priority = false }) {
  if (gallery?.length) {
    const slides = gallery.map((item) => ({
      src: item.src,
      alt: item.alt ?? alt ?? "Service illustration",
      label: item.label,
      sizes: item.sizes ?? sizes,
    }));
    return <ImageCarousel images={slides} aspect="aspect-[4/3]" sizes={sizes} priority={priority} />;
  }
  if (image) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-md bg-neutral-200">
        <Image src={image} alt={alt ?? "Service illustration"} fill className="object-cover" sizes={sizes} priority={priority} />
      </div>
    );
  }
  return (
    <div className="aspect-[4/3] rounded-t-md placeholder-box">
      <span className="relative z-10 text-sm">PLACEHOLDER</span>
    </div>
  );
}

export default function ServicesPage() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const show = (svc) => {
    setActive(svc);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setActive(null);
  };

  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        setActive(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Services</h1>
      <p className="mt-2 text-neutral-600">
        Explore our modification services. Tap any card to view details and book an appointment.
      </p>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => show(s)}
            className="text-left bg-white rounded-md border overflow-hidden hover:shadow-sm hover:-translate-y-0.5 transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
          >
            <ServiceIllustration
              image={s.image}
              gallery={s.gallery}
              alt={s.alt}
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 50vw, 100vw"
            />
            <div className="p-4">
              <div className="font-semibold text-sm">{s.title}</div>
              <div className="mt-1 text-sm text-neutral-600">{s.blurb}</div>
              <div className="mt-2 text-xs text-neutral-500">Starting at {s.price}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {open && active && (
        <div className="fixed inset-0 z-50" aria-modal="true" role="dialog" aria-label={active.title}>
          <div className="absolute inset-0 bg-black/50" onClick={close} aria-hidden="true" />
          <div className="absolute left-1/2 top-4 -translate-x-1/2 w-[min(640px,92vw)] max-h-[calc(100vh-2rem)] bg-white rounded-lg border shadow-lg overflow-hidden">
            <ServiceIllustration
              image={active.image}
              gallery={active.gallery}
              alt={active.alt}
              sizes="(min-width: 768px) 640px, 92vw"
              priority
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{active.title}</h3>
                  <div className="text-sm text-neutral-500">From {active.price}</div>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-md border w-8 h-8 grid place-items-center hover:bg-neutral-50"
                  aria-label="Close"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-neutral-700 text-sm">{active.details}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/book?service=${active.id}`}
                  className="rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800"
                  onClick={close}
                >
                  Book Now
                </Link>
                <button type="button" onClick={close} className="rounded-md border text-sm px-4 py-2 hover:bg-neutral-50">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}