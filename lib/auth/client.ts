export { createClient } from "@/lib/db/supabase-client";

export async function signInAnonymously() {
  const { createClient } = await import("@/lib/db/supabase-client");
  const supabase = createClient();
  return supabase.auth.signInAnonymously();
}

export async function signUpWithEmail(email: string, password: string) {
  const { createClient } = await import("@/lib/db/supabase-client");
  const supabase = createClient();
  return supabase.auth.signUp({ email, password });
}

export async function signInWithEmail(email: string, password: string) {
  const { createClient } = await import("@/lib/db/supabase-client");
  const supabase = createClient();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signInWithGoogle() {
  const { createClient } = await import("@/lib/db/supabase-client");
  const supabase = createClient();
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
}

export async function signOut() {
  const { createClient } = await import("@/lib/db/supabase-client");
  const supabase = createClient();
  return supabase.auth.signOut();
}

export async function linkAnonymousToPermanent() {
  const { createClient } = await import("@/lib/db/supabase-client");
  const supabase = createClient();
  return supabase.auth.updateUser({});
}
