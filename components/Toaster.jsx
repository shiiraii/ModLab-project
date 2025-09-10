"use client";

import { useEffect, useState } from "react";

export default function Toaster() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    function onToast(e) {
      const { id, message } = e.detail || {};
      setItems((prev) => [...prev, { id, message }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }, 2500);
    }
    window.addEventListener("modlab:toast", onToast);
    return () => window.removeEventListener("modlab:toast", onToast);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[100] space-y-2">
      {items.map((t) => (
        <div key={t.id} className="rounded-md bg-black text-white text-sm px-3 py-2 shadow-lg">
          {t.message}
        </div>
      ))}
    </div>
  );
}

