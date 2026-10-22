import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "./config";

export function getAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!isSupabaseConfigured() || !serviceRoleKey || serviceRoleKey.includes("your-service-role")) {
    return null;
  }

  return createClient(url!, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
