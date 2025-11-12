const normalize = (value) => value?.replace(/\/+$/, "");

/**
 * Returns the publicly reachable origin for auth redirects.
 * Prefers NEXT_PUBLIC_SITE_URL, then Vercel's injected URL, then falls back to localhost.
 */
export function getSiteUrl() {
  if (typeof window !== "undefined" && window?.location?.origin) {
    return normalize(window.location.origin);
  }

  const envUrl = normalize(process.env.NEXT_PUBLIC_SITE_URL);
  if (envUrl) return envUrl;

  const vercelUrl = normalize(process.env.NEXT_PUBLIC_VERCEL_URL);
  if (vercelUrl) {
    const hasProtocol = /^https?:\/\//i.test(vercelUrl);
    return hasProtocol ? vercelUrl : `https://${vercelUrl}`;
  }

  return "http://localhost:3000";
}
