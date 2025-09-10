"use client";

import { useState } from "react";
import { getSupabase } from "../lib/supabase/client";
import { toast } from "../lib/ui/toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function subscribe(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const s = getSupabase();
      if (!s) {
        setStatus("Supabase not configured. Add env vars to enable signup.");
        return;
      }
      const { error } = await s.from("newsletter_subscribers").insert({ email });
      if (error) throw error;
      setStatus("Thanks for subscribing!");
      toast("Subscribed to newsletter");
      setEmail("");
    } catch (err) {
      setStatus(err.message ?? "Could not subscribe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={subscribe} className="mt-4 flex gap-2">
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="min-w-0 flex-1 rounded-md border px-3 py-2 text-sm bg-white"
      />
      <button disabled={loading} className="rounded-md bg-black text-white text-sm px-3 py-2 hover:bg-neutral-800 disabled:opacity-60">
        Subscribe
      </button>
      {status && <div className="text-sm text-neutral-700 ml-2 self-center">{status}</div>}
    </form>
  );
}
