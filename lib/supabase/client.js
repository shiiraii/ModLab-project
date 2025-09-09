import { createClient } from "@supabase/supabase-js";

// Lazily create a singleton Supabase client, and avoid throwing during build
// when env vars may be absent (e.g., on CI/Vercel preview before env is set).
let singleton;

export function getSupabase() {
  if (singleton) return singleton;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    // Return null instead of throwing so Next.js can still pre-render pages
    // without a configured environment.
    return null;
  }
  singleton = createClient(url, key);
  return singleton;
}

// Convenience export: may be null if env not configured
export const supabase = getSupabase();
