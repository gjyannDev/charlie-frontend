import { normalizeError } from "@/shared/utils/api.helpers";
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
    mutationFn: async (params: SignInEmailFormValues) => {
      try {
        return await authService.checkEmail(params);
      } catch (error) {
        throw normalizeError(error);
      }
    },
  });
}

export function useSignInMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authKeys.login(),
    mutationFn: async (params: SignInLoginRequest) => {
      try {
        const response = await authService.login(params);
        authSessionStore.getState().applyLoginResponse(response);

        try {
          const profile = await authService.me();
          authSessionStore.getState().completeAuthentication(profile);
          writeAuthSessionHint(profile);
          queryClient.setQueryData(authKeys.currentProfile(), profile);
        } catch (error) {
          authSessionStore.getState().enterRecovery("profile-failed");
          clearAuthSessionHint();
          throw error;
        }

        return response;
      } catch (error) {
        throw normalizeError(error);
      }
    },
  });
}

export function useRefreshSessionMutation() {
  return useMutation({
    mutationKey: authKeys.refresh(),
    mutationFn: async (params: RefreshSessionRequest) => {
      try {
        return await authService.refresh(params);
      } catch (error) {
        throw normalizeError(error);
      }
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authKeys.logout(),
    mutationFn: async (params: LogoutRequest) => {
      try {
        return await authService.logout(params);
      } catch (error) {
        throw normalizeError(error);
      }
    },
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
    queryFn: async () => {
      try {
        return await authService.me();
      } catch (error) {
        throw normalizeError(error);
      }
    },
    enabled,
  });
}
