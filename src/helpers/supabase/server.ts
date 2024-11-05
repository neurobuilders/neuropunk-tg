import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/database-generated.types";
import env from "@/env";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.supabase.url!,
    env.supabase.anonKey!,
    {
      // use NextJS fetch for caching
      global: { fetch: fetch.bind(globalThis) },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
