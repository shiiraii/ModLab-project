"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "../lib/supabase/client";

export default function AuthMenu({ compact = false, onClickItem }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const s = getSupabase();
    if (!s) return;
    s.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: sub } = s.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
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

  const name = user.user_metadata?.full_name || user.email;

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
        <button onClick={signOut} className="text-left rounded-md px-2 py-2 hover:bg-neutral-50">Sign out</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden md:inline text-sm text-neutral-700">Hi, {name}</span>
      <Link href="/account/orders" className="rounded-md border text-xs px-3 py-1.5 hover:bg-neutral-50">My Orders</Link>
      <button onClick={signOut} className="rounded-md border text-xs px-3 py-1.5 hover:bg-neutral-50">Sign out</button>
    </div>
  );
}
