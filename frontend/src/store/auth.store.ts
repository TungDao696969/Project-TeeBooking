import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthState, User } from "@/types/auth.type";

interface AuthPersistState extends AuthState {
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthPersistState>()(
  persist(
    (set) => ({
      user: null,

      accessToken: null,

      isAuthenticated: false,

      forgotEmail: "",

      hasHydrated: false,

      setHasHydrated: (state) =>
        set({
          hasHydrated: state,
        }),

      setForgotEmail: (email) =>
        set({
          forgotEmail: email,
        }),

      setAuthenticated: (value) =>
        set({
          isAuthenticated: value,
        }),

      setAuth: (user, token) =>
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
        }),

      setUser: (user: User) =>
        set({
          user,
          isAuthenticated: true,
        }),

      updateUser: (user) =>
        set({
          user,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),

      updateUserAvatar: (avatar) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                avatar,
                avatarUrl: avatar,
              }
            : null,
        })),
    }),

    {
      name: "auth-storage",

      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => {
        return (state) => {
          state?.setHasHydrated(true);
        };
      },
    },
  ),
);
