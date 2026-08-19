import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CurrentUserProfile, LoginResponse } from "../types/auth.types";

export type AuthStatus =
  | "idle"
  | "bootstrapping"
  | "authenticated"
  | "unauthenticated"
  | "recovery";

export type RecoveryReason =
  | "refresh-failed"
  | "profile-failed"
  | "logout-failed"
  | null;

export type AuthSessionState = {
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string;
  currentProfile: CurrentUserProfile | null;
  status: AuthStatus;
  recoveryReason: RecoveryReason;
  setAccessToken: (accessToken: string | null) => void;
  setCurrentProfile: (currentProfile: CurrentUserProfile | null) => void;
  setStatus: (status: AuthStatus) => void;
  applyLoginResponse: (response: LoginResponse) => void;
  applyRefreshResponse: (response: LoginResponse) => void;
  completeAuthentication: (currentProfile: CurrentUserProfile) => void;
  enterRecovery: (reason: Exclude<RecoveryReason, null>) => void;
  clearSession: () => void;
};

const DEFAULT_TOKEN_TYPE = "bearer";

export const useAuthSessionStore = create<AuthSessionState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      tokenType: DEFAULT_TOKEN_TYPE,
      currentProfile: null,
      status: "idle",
      recoveryReason: null,
      setAccessToken: (accessToken) => set({ accessToken }),
      setCurrentProfile: (currentProfile) => set({ currentProfile }),
      setStatus: (status) => set({ status }),
      applyLoginResponse: (response) =>
        set({
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          tokenType: response.token_type || DEFAULT_TOKEN_TYPE,
          status: "bootstrapping",
          recoveryReason: null,
        }),
      applyRefreshResponse: (response) =>
        set((state) => ({
          accessToken: response.access_token,
          refreshToken: response.refresh_token ?? state.refreshToken,
          tokenType: response.token_type || state.tokenType || DEFAULT_TOKEN_TYPE,
          status: "bootstrapping",
          recoveryReason: null,
        })),
      completeAuthentication: (currentProfile) =>
        set({
          currentProfile,
          status: "authenticated",
          recoveryReason: null,
        }),
      enterRecovery: (reason) =>
        set({
          accessToken: null,
          refreshToken: null,
          tokenType: DEFAULT_TOKEN_TYPE,
          currentProfile: null,
          status: "recovery",
          recoveryReason: reason,
        }),
      clearSession: () =>
        set({
          accessToken: null,
          refreshToken: null,
          tokenType: DEFAULT_TOKEN_TYPE,
          currentProfile: null,
          status: "unauthenticated",
          recoveryReason: null,
        }),
    }),
    {
      name: "charlie-auth-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        tokenType: state.tokenType,
      }),
    },
  ),
);

export const authSessionStore = useAuthSessionStore;
