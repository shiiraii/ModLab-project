"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabase } from "../../lib/supabase/client";

const SERVICES = [
  { id: "switch-replacement", label: "Switch Replacement" },
  { id: "weight-reduction", label: "Weight Reduction Mod" },
  { id: "paracord-upgrade", label: "Paracord Cable Upgrade" },
  { id: "wireless-conversion", label: "Cable to Wireless Conversion" },
  { id: "grip-tape", label: "Grip Tape Application" },
  { id: "skate-install", label: "Skate Install (PTFE/Glass)" },
];

const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

function BookingContent() {
  const params = useSearchParams();
  const preselect = params.get("service") ?? "";
  const supabase = useMemo(() => getSupabase(), []);
  const [user, setUser] = useState(null);
  const [supabaseReady, setSupabaseReady] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [profile, setProfile] = useState(null);

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
    if (preselect) setForm((f) => ({ ...f, service: preselect }));
  }, [preselect]);

  useEffect(() => {
    const s = supabase;
    if (!s) return;
    setSupabaseReady(true);
    s.auth.getUser().then(async ({ data }) => {
      const nextUser = data?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        const { data: profileRow } = await s.from("profiles").select("full_name").eq("id", nextUser.id).maybeSingle();
        setProfile(profileRow ?? null);
        setForm((f) => ({
          ...f,
          name: profileRow?.full_name || nextUser.user_metadata?.full_name || nextUser.email || f.name,
          email: nextUser.email || f.email,
        }));
      }
      setAuthLoading(false);
    });
    const { data: sub } = s.auth.onAuthStateChange(async (_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        const { data: profileRow } = await s.from("profiles").select("full_name").eq("id", nextUser.id).maybeSingle();
        setProfile(profileRow ?? null);
        setForm((f) => ({
          ...f,
          name: profileRow?.full_name || nextUser.user_metadata?.full_name || nextUser.email || f.name,
          email: nextUser.email || f.email,
        }));
      } else {
        setProfile(null);
      }
      setAuthLoading(false);
    });
    return () => sub?.subscription?.unsubscribe();
  }, [supabase]);

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
    if (!supabase) {
      setMsg("Bookings require Supabase. Add your Supabase keys to enable scheduling.");
      return;
    }
    if (!user) {
      setMsg("Please sign in before booking so we can save your appointment.");
      return;
    }
    if (!appointmentISO) {
      setMsg("Please choose a valid date and time within our booking hours.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase
        .from("booking_requests")
        .insert({
          user_id: user?.id ?? null,
          service_slug: form.service || null,
          full_name: form.name,
          email: form.email,
          phone: form.phone || null,
          notes: form.notes || null,
          scheduled_for: appointmentISO,
        });
      if (error) throw error;
      setMsg("Booking request submitted! We'll email you a confirmation.");

      setForm({
        service: preselect,
        date: "",
        time: "",
        name: profile?.full_name || user?.user_metadata?.full_name || user?.email || "",
        email: user?.email || "",
        phone: "",
        notes: "",
      });
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
        Choose a service and preferred time. We'll follow up with confirmation once your request is received. Submissions are stored securely in Supabase.
      </p>

      {!supabase && (
        <div className="mt-4 rounded-md border bg-neutral-50 p-3 text-sm text-neutral-700">
          Booking requires Supabase configuration. Add your Supabase URL and anon key to enable scheduling.
        </div>
      )}
      {supabaseReady && !user && !authLoading && (
        <div className="mt-4 rounded-md border bg-neutral-50 p-3 text-sm text-neutral-700">
          Please sign in before booking so we can save your appointment to your ModLab account.
        </div>
      )}

      <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-neutral-700" htmlFor="service">
            Service
          </label>
          <select
            id="service"
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-neutral-700" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-700" htmlFor="time">
              Time
            </label>
            <select
              id="time"
              name="time"
              value={form.time}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
            >
              <option value="" disabled>
                Select a time slot
              </option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot} (local time)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-neutral-700" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
              placeholder="Jane Smith"
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-neutral-700" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="(555) 555-5555"
            autoComplete="tel"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-700" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
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
          disabled={saving || !supabase || !user}
          className="rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800 disabled:opacity-60"
        >
          {saving ? "Submitting..." : "Submit Booking"}
        </button>
      </form>

      {msg && <div className="mt-4 text-sm text-neutral-700">{msg}</div>}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl px-4 py-10">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
