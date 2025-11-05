"use client";

import { useState } from "react";
import { getSupabase } from "../lib/supabase/client";
import { toast } from "../lib/ui/toast";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  message: "",
};

const LOCAL_KEY = "modlab_contacts_v1";

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus(null);
    setSaving(true);
    try {
      const supabase = getSupabase();
      const payload = {
        first_name: form.firstName || null,
        last_name: form.lastName || null,
        email: form.email,
        address: form.address || null,
        city: form.city || null,
        state: form.state || null,
        postal_code: form.postalCode || null,
        message: form.message || null,
      };

      if (supabase) {
        const { error } = await supabase.from("contact_messages").insert(payload);
        if (error) throw error;
        toast("Message sent");
        setStatus("Thanks for reaching out! We'll get back to you soon.");
      } else {
        try {
          const raw = localStorage.getItem(LOCAL_KEY);
          const items = raw ? JSON.parse(raw) : [];
          items.push({ ...payload, id: Date.now(), created_at: new Date().toISOString() });
          localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
        } catch {
          // ignore storage errors in preview mode
        }
        setStatus("Thanks for reaching out! (preview mode)");
      }
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus(error.message ?? "We could not send your message. Please try again soon.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-neutral-700" htmlFor="firstName">
          First name
        </label>
        <input
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          required
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
          placeholder="Jane"
          autoComplete="given-name"
        />
      </div>
      <div>
        <label className="block text-sm text-neutral-700" htmlFor="lastName">
          Last name
        </label>
        <input
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
          placeholder="Smitherton"
          autoComplete="family-name"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm text-neutral-700" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
          placeholder="email@janesfakedomain.net"
          autoComplete="email"
        />
      </div>
      <div>
        <label className="block text-sm text-neutral-700" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          name="address"
          value={form.address}
          onChange={onChange}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
          placeholder="123 Main St"
          autoComplete="address-line1"
        />
      </div>
      <div>
        <label className="block text-sm text-neutral-700" htmlFor="city">
          City
        </label>
        <input
          id="city"
          name="city"
          value={form.city}
          onChange={onChange}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
          placeholder="Springfield"
          autoComplete="address-level2"
        />
      </div>
      <div>
        <label className="block text-sm text-neutral-700" htmlFor="state">
          State/Province
        </label>
        <input
          id="state"
          name="state"
          value={form.state}
          onChange={onChange}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
          placeholder="CA"
          autoComplete="address-level1"
        />
      </div>
      <div>
        <label className="block text-sm text-neutral-700" htmlFor="postalCode">
          ZIP/Postal code
        </label>
        <input
          id="postalCode"
          name="postalCode"
          value={form.postalCode}
          onChange={onChange}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
          placeholder="94016"
          autoComplete="postal-code"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm text-neutral-700" htmlFor="message">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={onChange}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
          placeholder="Enter your question or message"
        />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800 disabled:opacity-60"
        >
          {saving ? "Sending..." : "Submit"}
        </button>
        {status && <div className="mt-2 text-sm text-neutral-700">{status}</div>}
      </div>
    </form>
  );
}
