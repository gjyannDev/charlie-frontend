import type { z } from "zod";

import type {
  signInCredentialsSchema,
  signInEmailSchema,
  signInLoginRequestSchema,
} from "../schemas/auth.schema";

export type SignInEmailFormValues = z.infer<typeof signInEmailSchema>;
export type SignInCredentialsFormValues = z.infer<
  typeof signInCredentialsSchema
>;
export type SignInLoginRequest = z.infer<typeof signInLoginRequestSchema>;

export type EmailCheckResponse = {
  exists: boolean;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string | null;
  token_type: "bearer" | string;
};

export type RefreshSessionRequest = {
  refresh_token: string;
};

export type RefreshSessionResponse = LoginResponse;

export type LogoutRequest = RefreshSessionRequest;

export type LogoutResponse = {
  message: string;
};

export type UserRole = "admin" | "user" | string;

export type CurrentUserProfile = {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
};
