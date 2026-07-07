"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/db/supabase-client";
import { useAuthStore } from "@/stores/auth-store";
import type { User } from "@supabase/supabase-js";
import { Spinner } from "@/components/ui/spinner";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

function syncAuthStore(user: User | null) {
  useAuthStore.getState().setAuth({
    isAuthenticated: !!user,
    userId: user?.id ?? null,
    email: user?.email ?? null,
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const supabase = createClient();
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    setUser(currentUser);
    syncAuthStore(currentUser);
  };

  useEffect(() => {
    const supabase = createClient();

    async function init() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
      syncAuthStore(currentUser);
      setLoading(false);
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      syncAuthStore(currentUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3">
        <Spinner className="h-6 w-6" />
        <span className="text-body-md text-text-secondary animate-pulse">Loading TripCraft…</span>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
