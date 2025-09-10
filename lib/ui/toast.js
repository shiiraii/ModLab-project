"use client";

export function toast(message) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("modlab:toast", { detail: { id: Date.now() + Math.random(), message } })
  );
}

