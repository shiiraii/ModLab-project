"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "../lib/supabase/client";

export default function AuthMenu({ compact = false, onClickItem }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const s = getSupabase();
    if (!s) return;
    async function hydrate(nextUser) {
      if (nextUser) {
        const { data: profileRow } = await s.from("profiles").select("full_name, role").eq("id", nextUser.id).maybeSingle();
        setProfile(profileRow ?? null);
      } else {
        setProfile(null);
      }
    }
    s.auth.getUser().then(async ({ data }) => {
      const nextUser = data?.user ?? null;
      setUser(nextUser);
      await hydrate(nextUser);
    });
    const { data: sub } = s.auth.onAuthStateChange(async (_e, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      await hydrate(nextUser);
    });
    return () => sub?.subscription?.unsubscribe();
  }, []);

  if (!user) {
    return (
      <Link
        href="/login"
        onClick={onClickItem}
        className={compact ? "rounded-md px-2 py-2 hover:bg-neutral-50" : "rounded-md bg-black text-white text-xs px-3 py-1.5 hover:bg-neutral-800"}
      >
        {compact ? "Sign In / Register" : "Sign In/Register"}
      </Link>
    );
  }

  const name = profile?.full_name || user.user_metadata?.full_name || user.email;

  const router = useRouter();
  async function signOut() {
    const s = getSupabase();
    await s?.auth.signOut();
    router.push("/");
  }

  if (compact) {
    return (
      <div className="grid gap-2 text-sm">
        <div className="px-2 py-2 text-neutral-700">Hi, {name}</div>
        <Link href="/account/orders" onClick={onClickItem} className="rounded-md px-2 py-2 hover:bg-neutral-50">
          My Orders
        </Link>
        <Link href="/account/bookings" onClick={onClickItem} className="rounded-md px-2 py-2 hover:bg-neutral-50">
          My Bookings
        </Link>
        <button onClick={signOut} className="text-left rounded-md px-2 py-2 hover:bg-neutral-50">Sign out</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden md:inline text-sm text-neutral-700">Hi, {name}</span>
      <Link href="/account/orders" className="rounded-md border text-xs px-3 py-1.5 hover:bg-neutral-50">My Orders</Link>
      <Link href="/account/bookings" className="rounded-md border text-xs px-3 py-1.5 hover:bg-neutral-50">My Bookings</Link>
      <button onClick={signOut} className="rounded-md border text-xs px-3 py-1.5 hover:bg-neutral-50">Sign out</button>
    </div>
  );
}
