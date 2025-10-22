"use client";

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

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export default function AdminBookingsPage() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getUser().then(async ({ data }) => {
      const nextUser = data?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", nextUser.id).maybeSingle();
        setIsAdmin(profile?.role === "admin");
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  async function load() {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data, error } = await supabase
      .from("booking_requests")
      .select("id, user_id, service_slug, status, scheduled_for, created_at, full_name, email, phone, notes")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setBookings(data);
  }

  useEffect(() => {
    if (isAdmin) {
      load();
    } else {
      setBookings(null);
    }
  }, [user, isAdmin]);

  async function updateStatus(id, status) {
    const supabase = getSupabase();
    if (!supabase) return;
    const { error } = await supabase.from("booking_requests").update({ status }).eq("id", id);
    if (error) setError(error.message);
    await load();
  }

  if (!user) return <div className="mx-auto max-w-5xl px-4 py-10">Please sign in.</div>;
  if (!isAdmin)
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        Not authorized. Set your profile role to "admin" in Supabase.
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">All Bookings (Admin)</h1>
      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
      {bookings === null ? (
        <div className="mt-6 text-sm text-neutral-600">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="mt-6 text-sm text-neutral-700">No bookings found.</div>
      ) : (
        <div className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-md border bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-neutral-500">#{booking.id.slice(0, 8)}</div>
                  <div className="font-medium text-sm">
                    {SERVICE_LABELS[booking.service_slug] ?? booking.service_slug}
                  </div>
                  <div className="text-sm text-neutral-600">
                    Requested {booking.created_at ? new Date(booking.created_at).toLocaleString() : "—"}
                  </div>
                  {booking.scheduled_for && (
                    <div className="text-sm text-neutral-600">
                      Scheduled for {new Date(booking.scheduled_for).toLocaleString()}
                    </div>
                  )}
                </div>
                <div>
                  <select
                    value={booking.status ?? "pending"}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                    className="rounded-md border px-2 py-1.5 text-sm bg-white"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
                <div>
                  <div className="font-medium">Customer</div>
                  <div>{booking.full_name || "—"}</div>
                  <div>{booking.email}</div>
                  {booking.phone && <div>{booking.phone}</div>}
                </div>
                <div>
                  <div className="font-medium">Notes</div>
                  <div>{booking.notes || "—"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}