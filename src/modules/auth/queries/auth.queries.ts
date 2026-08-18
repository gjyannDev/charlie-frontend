import { normalizeError } from "@/shared/utils/api.helpers";
import { useMutation } from "@tanstack/react-query";

import { authKeys } from "./auth.keys";
import { authService } from "../services/auth.services";
import type {
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
  return useMutation({
    mutationKey: authKeys.login(),
    mutationFn: async (params: SignInLoginRequest) => {
      try {
        return await authService.login(params);
      } catch (error) {
        throw normalizeError(error);
      }
    },
  });
}
