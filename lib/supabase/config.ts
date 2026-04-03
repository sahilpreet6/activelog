export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim();

  if (!url || !anonKey) {
    return null;
  }

  if (
    url.includes("your_supabase_url") ||
    anonKey.includes("your_supabase_anon_key") ||
    anonKey.includes("your_supabase_publishable_key")
  ) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return null;
    }

    return { url, anonKey };
  } catch {
    return null;
  }
}
