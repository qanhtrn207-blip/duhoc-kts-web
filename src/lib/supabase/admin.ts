import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "./config";

export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!isSupabaseConfigured() || !key || key.includes("your-service-role") || key.includes("your-supabase-anon-key")) {
    return null;
  }

  return createClient(url!, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
