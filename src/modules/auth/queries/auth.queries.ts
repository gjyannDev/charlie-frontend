import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  clearAuthSessionHint,
  writeAuthSessionHint,
} from "@/modules/auth/session/auth-session";

import { authKeys } from "./auth.keys";
import { authService } from "../services/auth.services";
import { authSessionStore } from "../store/auth.store";
import type {
  LogoutRequest,
  RefreshSessionRequest,
  SignInEmailFormValues,
  SignInLoginRequest,
} from "../types/auth.types";

export function useCheckEmailMutation() {
  return useMutation({
    mutationKey: authKeys.emailCheck(),
    mutationFn: (params: SignInEmailFormValues) => authService.checkEmail(params),
  });
}

export function useSignInMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authKeys.login(),
    mutationFn: async (params: SignInLoginRequest) => {
      const response = await authService.login(params);
      authSessionStore.getState().applyLoginResponse(response);

      const profile = await authService.me();
      authSessionStore.getState().completeAuthentication(profile);
      writeAuthSessionHint(profile);
      queryClient.setQueryData(authKeys.currentProfile(), profile);

      return response;
    },
    onError: () => {
      const { status } = authSessionStore.getState();

      if (status !== "bootstrapping") {
        return;
      }

      authSessionStore.getState().enterRecovery("profile-failed");
      clearAuthSessionHint();
      queryClient.removeQueries({ queryKey: authKeys.currentProfile() });
    },
  });
}

export function useRefreshSessionMutation() {
  return useMutation({
    mutationKey: authKeys.refresh(),
    mutationFn: (params: RefreshSessionRequest) => authService.refresh(params),
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authKeys.logout(),
    mutationFn: (params: LogoutRequest) => authService.logout(params),
    onSuccess: () => {
      authSessionStore.getState().clearSession();
      clearAuthSessionHint();
      queryClient.removeQueries({ queryKey: authKeys.currentProfile() });
    },
  });
}

export function useCurrentProfileQuery(enabled = true) {
  return useQuery({
    queryKey: authKeys.currentProfile(),
    queryFn: () => authService.me(),
    enabled,
  });
}
