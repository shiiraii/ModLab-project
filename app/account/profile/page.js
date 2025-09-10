"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "../../../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const s = getSupabase();
    if (!s) return;
    s.auth.getUser().then(({ data }) => {
      const u = data?.user ?? null;
      setUser(u);
      setName(u?.user_metadata?.full_name || "");
    });
  }, []);

  async function save(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const s = getSupabase();
      const { error } = await s?.auth.updateUser({ data: { full_name: name } });
      if (error) throw error;
      setMsg("Saved");
    } catch (err) {
      setMsg(err.message ?? "Could not save");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    const s = getSupabase();
    await s?.auth.signOut();
    router.push("/");
  }

  if (!user) return <div className="mx-auto max-w-xl px-4 py-10">Please sign in.</div>;

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <form onSubmit={save} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm text-neutral-700">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" />
        </div>
        <div className="text-sm text-neutral-600">Email: {user.email}</div>
        <div className="flex gap-2">
          <button disabled={loading} className="rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800 disabled:opacity-60">Save</button>
          <button type="button" onClick={signOut} className="rounded-md border text-sm px-4 py-2 hover:bg-neutral-50">Sign out</button>
        </div>
        {msg && <div className="text-sm text-neutral-700">{msg}</div>}
      </form>
    </div>
  );
}

