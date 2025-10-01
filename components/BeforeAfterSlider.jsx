"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function BeforeAfterSlider({ before, after, aspect = "aspect-[16/10]" }) {
  const [value, setValue] = useState(50);
  const percentage = useMemo(() => clamp(value, 0, 100), [value]);

  const handleInput = useCallback((event) => {
    setValue(Number(event.target.value));
  }, []);

  const stopPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <div className={`relative w-full ${aspect} overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900`}> 
      <Image
        src={after.src}
        alt={after.alt || "After modification"}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 36rem, 100vw"
        priority={after.priority}
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${percentage}%` }}>
        <Image
          src={before.src}
          alt={before.alt || "Before modification"}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 36rem, 100vw"
          priority={before.priority}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 flex items-center"
        style={{ left: `calc(${percentage}% - 1px)` }}
        aria-hidden="true"
      >
        <div className="h-full w-px bg-white/70" />
        <div className="pointer-events-auto -ml-[18px] flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/90 text-neutral-900 shadow-md">
          <div className="flex items-center gap-0.5 text-xs font-medium">
            <span>⇆</span>
          </div>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={percentage}
        onChange={handleInput}
        onPointerDown={stopPropagation}
        onPointerUp={stopPropagation}
        onClick={stopPropagation}
        aria-label="Adjust before and after comparison"
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent"
      />
    </div>
  );
}