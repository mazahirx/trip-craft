import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-zinc-900">Sign in to TripCraft</h1>
        <p className="mt-2 text-zinc-600">
          Save trips permanently and access them from any device.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="text-sm text-zinc-500">Loading…</div>}>
            <AuthForm mode="login" />
          </Suspense>
        </div>
      </div>
    </AppShell>
  );
}
