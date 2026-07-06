import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-margin-mobile md:px-0">
      <Suspense fallback={<div className="text-body-md text-text-secondary">Loading…</div>}>
        <AuthForm mode="login" />
      </Suspense>
    </div>
  );
}
