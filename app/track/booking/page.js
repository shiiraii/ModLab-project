"use client";

import { useMemo, useState } from "react";
import { getSupabase } from "../../../lib/supabase/client";
import Link from "next/link";

const SERVICE_LABELS = {
  "switch-replacement": "Switch Replacement",
  "weight-reduction": "Weight Reduction Mod",
  "paracord-upgrade": "Paracord Cable Upgrade",
  "wireless-conversion": "Cable to Wireless Conversion",
  "grip-tape": "Grip Tape Application",
  "skate-install": "Skate Install (PTFE/Glass)",
};

export default function BookingTrackerPage() {
  const [form, setForm] = useState({ email: "", reference: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState(null);

  const displayBookings = useMemo(() => {
    if (!bookings) return [];
    return bookings.map((booking) => ({
      ...booking,
      prettyService: SERVICE_LABELS[booking.service_id] ?? booking.service_id ?? "Service",
      appointment_at: booking.appointment_at ? new Date(booking.appointment_at) : null,
      created_at: booking.created_at ? new Date(booking.created_at) : null,
    }));
  }, [bookings]);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setBookings(null);

    const email = form.email.trim().toLowerCase();
    if (!email) {
      setError("Enter the email you used when booking.");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setError("Tracking requires Supabase. Configure env vars before deploying.");
      return;
    }

    setLoading(true);
    try {
      let query = supabase
        .from("bookings")
        .select("id, service_id, status, appointment_at, created_at, notes")
        .eq("email", email)
        .order("appointment_at", { ascending: true });
      const ref = form.reference.trim();
      if (ref) {
        const refNumber = Number(ref);
        query = query.eq("id", Number.isNaN(refNumber) ? ref : refNumber);
      }
      const { data, error } = await query;
      if (error) throw error;
      if (!data || data.length === 0) {
        setError("We couldn\'t find any bookings for that email. Double-check your spelling or use another email.");
        setBookings([]);
      } else {
        setBookings(data);
      }
    } catch (err) {
      console.error("Booking lookup failed", err);
      setError(err.message ?? "Unable to load bookings right now. Try again soon.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Track Your Booking</h1>
      <p className="mt-2 text-neutral-600 text-sm">
        Enter the email you used to schedule an appointment. Optional: add a booking ID if you have it.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium text-neutral-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="reference" className="text-sm font-medium text-neutral-700">
            Booking ID (optional)
          </label>
          <input
            id="reference"
            value={form.reference}
            onChange={(e) => setForm({ ...form, reference: e.target.value })}
            className="rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="e.g. 123"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-10 rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800 disabled:opacity-60"
        >
          {loading ? "Looking up..." : "Check Booking"}
        </button>
      </form>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

      {bookings && bookings.length > 0 && (
        <div className="mt-6 space-y-4">
          {displayBookings.map((booking) => (
            <div key={booking.id} className="rounded-md border bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-sm">Booking #{booking.id}</div>
                  <div className="text-sm text-neutral-600">{booking.prettyService}</div>
                  {booking.appointment_at && (
                    <div className="text-sm text-neutral-600">
                      Appointment {booking.appointment_at.toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-600">Status</div>
                  <div className="font-semibold capitalize">{booking.status ?? "pending"}</div>
                </div>
              </div>
              {booking.notes && (
                <div className="mt-3 text-sm text-neutral-700">
                  Notes: {booking.notes}
                </div>
              )}
              {booking.created_at && (
                <div className="mt-3 text-xs text-neutral-500">
                  Created {booking.created_at.toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {bookings && bookings.length === 0 && !error && (
        <div className="mt-4 text-sm text-neutral-600">
          No bookings found yet. Need to schedule one? <Link href="/book" className="underline">Book a service</Link>.
        </div>
      )}
    </div>
  );
}
