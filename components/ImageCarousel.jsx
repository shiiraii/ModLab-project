"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageCarousel({ images = [], aspect = "aspect-[4/3]", sizes = "100vw", priority = false, className = "" }) {
  if (!images.length) return null;
  const [index, setIndex] = useState(0);
  const total = images.length;

  const go = (delta) => {
    setIndex((prev) => {
      const next = (prev + delta + total) % total;
      return next;
    });
  };

  const current = images[index];

  return (
    <div className={`group relative overflow-hidden rounded-md bg-black ${aspect} ${className}`}>
      <Image
        src={current.src}
        alt={current.alt ?? "Service preview"}
        fill
        className="object-contain"
        sizes={current.sizes ?? sizes}
        priority={priority}
      />
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            aria-label="Previous image"
          >
            <span aria-hidden>{"<"}</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            aria-label="Next image"
          >
            <span aria-hidden>{">"}</span>
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
          {current.label && (
            <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
              {current.label}
            </div>
          )}
        </>
      )}
    </div>
  );
}
