"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabase } from "../../../lib/supabase/client";

const SERVICE_LABELS = {
  "switch-replacement": "Switch Replacement",
  "weight-reduction": "Weight Reduction Mod",
  "paracord-upgrade": "Paracord Cable Upgrade",
  "wireless-conversion": "Cable to Wireless Conversion",
  "grip-tape": "Grip Tape Application",
  "skate-install": "Skate Install (PTFE/Glass)",
};

export default function AccountBookingsPage() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase || !user) return;
    supabase
      .from("booking_requests")
      .select("id, service_slug, status, scheduled_for, created_at, notes")
      .eq("user_id", user.id)
      .order("scheduled_for", { ascending: true })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setBookings(data);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">My Bookings</h1>
        <p className="mt-4 text-sm text-neutral-700">
          Please <Link href="/login" className="underline">sign in</Link> to view your bookings.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">My Bookings</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Track your upcoming appointments and their status. Need another service? <Link href="/book" className="underline">Book another</Link>.
      </p>
      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
      {bookings === null ? (
        <div className="mt-6 text-sm text-neutral-600">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="mt-6 text-sm text-neutral-700">
          No bookings yet. <Link href="/book" className="underline">Schedule your first mod</Link>.
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="rounded-md border bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-neutral-500">#{booking.id.slice(0, 8)}</div>
                  <div className="font-medium">{SERVICE_LABELS[booking.service_slug] ?? booking.service_slug}</div>
                  <div className="text-sm text-neutral-600">
                    {booking.scheduled_for ? new Date(booking.scheduled_for).toLocaleString() : "Pending scheduling"}
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-neutral-500">Status</div>
                  <div className="font-semibold capitalize">{booking.status ?? "pending"}</div>
                </div>
              </div>
              {booking.notes && (
                <div className="mt-3 rounded-md bg-neutral-50 p-3 text-sm text-neutral-700">
                  Notes: {booking.notes}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}