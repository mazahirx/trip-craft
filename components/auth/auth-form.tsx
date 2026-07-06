"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  signInWithEmail,
  signInWithGoogle,
} from "@/lib/auth/client";
import { createClient } from "@/lib/db/supabase-client";
import { useAuth } from "@/components/providers/auth-provider";

const authSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthFormProps {
  mode?: "login" | "signup";
}

export function AuthForm({ mode: initialMode = "login" }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  const { isAnonymous, refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const { error: signInError } = await signInWithEmail(data.email, data.password);
        if (signInError) throw signInError;
      } else {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.is_anonymous) {
          const { error: linkError } = await supabase.auth.updateUser({
            email: data.email,
            password: data.password,
          });
          if (linkError) throw linkError;
        } else {
          const { error: signUpError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
          });
          if (signUpError) throw signUpError;
        }
      }
      await refreshUser();
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    const { error: oauthError } = await signInWithGoogle();
    if (oauthError) setError(oauthError.message);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="mb-spacing-gap-lg text-center">
        <h1 className="text-display text-primary tracking-tight mb-spacing-base">TripCraft</h1>
        <p className="text-body-lg text-text-secondary">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </p>
      </div>

      {isAnonymous && mode === "signup" && (
        <div className="w-full mb-spacing-gap-md px-spacing-gap-md py-spacing-gap-sm bg-surface border border-border-subtle rounded-lg text-body-md text-text-secondary text-center">
          Your current trip will be saved to this account automatically.
        </div>
      )}

      <div className="w-full space-y-spacing-gap-sm mb-spacing-gap-lg">
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-spacing-gap-sm px-spacing-gap-md py-spacing-gap-sm border border-border-muted rounded bg-bg-canvas text-body-md text-primary transition-soft hover:bg-hover-fill active:opacity-80"
        >
          <svg height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4" />
            <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853" />
            <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05" />
            <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>
      </div>

      <div className="w-full flex items-center gap-spacing-gap-md mb-spacing-gap-lg">
        <div className="h-px flex-grow bg-border-subtle" />
        <span className="text-label-md text-text-secondary uppercase tracking-widest">or</span>
        <div className="h-px flex-grow bg-border-subtle" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-spacing-gap-md">
        <div className="space-y-spacing-base">
          <label className="text-label-md text-text-secondary ml-spacing-base" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address..."
            className="w-full px-spacing-gap-md py-spacing-gap-sm border border-border-subtle rounded text-body-md text-primary bg-bg-canvas transition-soft focus:border-primary focus:outline-none"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
        </div>
        <div className="space-y-spacing-base">
          <div className="flex justify-between items-center px-spacing-base">
            <label className="text-label-md text-text-secondary" htmlFor="password">Password</label>
          </div>
          <input
            id="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            placeholder="Enter your password..."
            className="w-full px-spacing-gap-md py-spacing-gap-sm border border-border-subtle rounded text-body-md text-primary bg-bg-canvas transition-soft focus:border-primary focus:outline-none"
            {...register("password")}
          />
          {errors.password && <p className="text-xs text-error mt-1">{errors.password.message}</p>}
        </div>

        {error && <p className="text-sm text-error bg-error-container/20 px-3 py-2 rounded">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-spacing-gap-sm bg-primary text-on-primary text-body-md rounded transition-soft hover:opacity-90 active:opacity-80 disabled:opacity-50"
        >
          {loading ? "Please wait…" : mode === "login" ? "Continue" : "Create account"}
        </button>
      </form>

      <footer className="mt-spacing-gap-lg pt-spacing-gap-lg border-t border-border-subtle w-full text-center">
        <p className="text-body-md text-text-secondary mb-spacing-gap-sm">
          {mode === "login" ? "New to TripCraft?" : "Already have an account?"}
        </p>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="inline-flex items-center gap-spacing-gap-xs text-body-md text-primary hover:underline decoration-1 underline-offset-4 transition-soft group"
        >
          {mode === "login" ? "Start planning anonymously" : "Sign in"}
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
}

export function SignOutButton() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const handleSignOut = async () => {
    const { signOut } = await import("@/lib/auth/client");
    await signOut();
    await refreshUser();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="text-text-secondary hover:text-primary transition-colors text-body-md"
    >
      Sign out
    </button>
  );
}
