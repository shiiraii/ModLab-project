"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase/client";

const SERVICES = [
  { id: "switch-replacement", label: "Switch Replacement" },
  { id: "weight-reduction", label: "Weight Reduction Mod" },
  { id: "paracord-upgrade", label: "Paracord Cable Upgrade" },
  { id: "wireless-conversion", label: "Cable → Wireless Conversion" },
  { id: "grip-tape", label: "Grip Tape Application" },
  { id: "skate-install", label: "Skate Install (PTFE/Glass)" },
];

export default function BookPage() {
  const params = useSearchParams();
  const preselect = params.get("service") ?? "";
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const [form, setForm] = useState({
    service: preselect,
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    // preselect may arrive after first render
    if (preselect) setForm((f) => ({ ...f, service: preselect }));
  }, [preselect]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const appointmentISO = useMemo(() => {
    if (!form.date || !form.time) return null;
    try {
      const d = new Date(`${form.date}T${form.time}`);
      return d.toISOString();
    } catch {
      return null;
    }
  }, [form.date, form.time]);

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    if (!user) {
      setMsg("Please sign in to book an appointment.");
      return;
    }
    if (!appointmentISO) {
      setMsg("Please choose a valid date and time.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        user_id: user.id,
        service_id: form.service || null,
        name: form.name,
        email: form.email,
        phone: form.phone,
        notes: form.notes,
        appointment_at: appointmentISO,
      };
      const { error } = await supabase.from("bookings").insert(payload);
      if (error) throw error;
      setMsg("Booking request submitted! We’ll email you a confirmation.");
      setForm({ service: preselect, date: "", time: "", name: "", email: "", phone: "", notes: "" });
    } catch (err) {
      setMsg(err.message ?? "Could not submit booking.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Book Appointment</h1>
      <p className="mt-2 text-neutral-600 text-sm">
        Choose a service and preferred time. You must be signed in to submit.
      </p>

      {!user && (
        <div className="mt-4 rounded-md border bg-neutral-50 text-neutral-700 text-sm p-3">
          You’re not signed in. Please sign in on the <a href="/login" className="underline">login page</a> first.
        </div>
      )}

      <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-neutral-700">Service</label>
          <select
            name="service"
            value={form.service}
            onChange={onChange}
            required
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-700">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-700">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-700">Full name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
              placeholder="Jane Smith"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-neutral-700">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="(555) 555-5555"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-700">Notes</label>
          <textarea
            name="notes"
            rows={4}
            value={form.notes}
            onChange={onChange}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="Anything we should know?"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800 disabled:opacity-60"
        >
          {saving ? "Submitting…" : "Submit Booking"}
        </button>
      </form>

      {msg && <div className="mt-4 text-sm text-neutral-700">{msg}</div>}
    </div>
  );
}

