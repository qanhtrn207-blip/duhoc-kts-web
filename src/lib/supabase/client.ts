import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured } from "./config";

export function createClient() {
  if (!isSupabaseConfigured()) {
    // Return dummy client if not configured so frontend doesn't crash
    return null;
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
