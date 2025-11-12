"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "../../../lib/supabase/client";
import { ensureProfile } from "../../../lib/supabase/profile";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying your link…");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = getSupabase();
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }

    const completeSignIn = async () => {
      const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
      if (error) {
        if (!cancelled) setError(error.message ?? "Unable to finish signing you in.");
        return;
      }
      const user = data.session?.user ?? null;
      await ensureProfile(supabase, user, user?.user_metadata?.full_name);
      if (!cancelled) {
        setStatus("Success! Redirecting…");
        setTimeout(() => router.replace("/account/profile"), 1200);
      }
    };

    completeSignIn().catch((err) => {
      if (!cancelled) setError(err.message ?? "Unexpected error completing sign in.");
    }).finally(() => {
      if (typeof window !== "undefined") {
        window.location.hash = "";
      }
    });

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Signing you in…</h1>
      <p className="mt-2 text-sm text-neutral-600">{error ?? status}</p>
      {error && (
        <p className="mt-6 text-sm">
          <Link href="/login" className="underline">
            Return to login
          </Link>
        </p>
      )}
    </div>
  );
}
