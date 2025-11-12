/**
 * Ensure the Supabase profile row exists and mirrors the latest name metadata.
 */
export async function ensureProfile(supabase, user, fullName) {
  if (!supabase || !user) return;

  const submittedName = fullName?.trim();
  const payload = { id: user.id };

  try {
    if (submittedName) {
      payload.full_name = submittedName;
      await supabase.auth.updateUser({ data: { full_name: submittedName } });
    }
    await supabase.from("profiles").upsert(payload, { onConflict: "id" });
  } catch (error) {
    console.warn("Unable to upsert profile", error);
  }
}
