"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  clearAuthSessionHint,
  writeAuthSessionHint,
} from "@/modules/auth/session/auth-session-hints";

import { authKeys } from "../queries/auth.keys";
import { authService } from "../services/auth.services";
import {
  authSessionStore,
  useAuthSessionStore,
} from "../store/auth.store";

export function AuthSessionBootstrap() {
  const queryClient = useQueryClient();
  const status = useAuthSessionStore((state) => state.status);
  const [hasHydrated, setHasHydrated] = useState(false);
  const bootstrapStarted = useRef(false);

  useEffect(() => {
    const persistApi = useAuthSessionStore.persist;

    if (!persistApi) {
      queueMicrotask(() => setHasHydrated(true));
      return;
    }

    const unsubscribe = persistApi.onFinishHydration(() => {
      setHasHydrated(true);
    });

    if (persistApi.hasHydrated()) {
      queueMicrotask(() => setHasHydrated(true));
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!hasHydrated || bootstrapStarted.current || status !== "idle") {
      return;
    }

    bootstrapStarted.current = true;

    const bootstrapSession = async () => {
      const refreshToken = authSessionStore.getState().refreshToken;

      if (!refreshToken) {
        authSessionStore.getState().setStatus("unauthenticated");
        return;
      }

      authSessionStore.getState().setStatus("bootstrapping");

      try {
        const refreshResponse = await authService.refresh({
          refresh_token: refreshToken,
        });
        authSessionStore.getState().applyRefreshResponse(refreshResponse);
      } catch {
        authSessionStore.getState().enterRecovery("refresh-failed");
        clearAuthSessionHint();
        queryClient.removeQueries({ queryKey: authKeys.currentProfile() });
        return;
      }

      try {
        const profile = await authService.me();
        authSessionStore.getState().completeAuthentication(profile);
        writeAuthSessionHint(profile);
        queryClient.setQueryData(authKeys.currentProfile(), profile);
      } catch {
        authSessionStore.getState().enterRecovery("profile-failed");
        clearAuthSessionHint();
        queryClient.removeQueries({ queryKey: authKeys.currentProfile() });
      }
    };

    void bootstrapSession();
  }, [hasHydrated, queryClient, status]);

  return null;
}
