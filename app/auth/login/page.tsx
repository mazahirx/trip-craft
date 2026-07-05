import { AppShell } from "@/components/layout/app-shell";

export default function LoginPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-zinc-900">Sign in to TripCraft</h1>
        <p className="mt-2 text-zinc-600">
          Save trips permanently and access them from any device.
        </p>
        <p className="mt-8 rounded-lg border border-dashed border-zinc-300 p-6 text-sm text-zinc-500">
          Auth UI — connect Supabase Auth (email, Google OAuth, magic link).
        </p>
      </div>
    </AppShell>
  );
}
