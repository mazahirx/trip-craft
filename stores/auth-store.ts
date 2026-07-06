import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  setAuth: (data: {
    isAuthenticated: boolean;
    userId: string | null;
    email: string | null;
  }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  email: null,

  setAuth: (data) => set(data),
  clearAuth: () =>
    set({
      isAuthenticated: false,
      userId: null,
      email: null,
    }),
}));
