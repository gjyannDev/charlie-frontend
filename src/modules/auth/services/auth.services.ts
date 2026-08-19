import { API } from "@/lib/config/axios.client";

import type {
  CurrentUserProfile,
  EmailCheckResponse,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RefreshSessionRequest,
  RefreshSessionResponse,
  SignInEmailFormValues,
  SignInLoginRequest,
} from "../types/auth.types";

class AuthService {
  private readonly authBasePath = "/auth";

  async checkEmail(params: SignInEmailFormValues): Promise<EmailCheckResponse> {
    const response = await API.post<EmailCheckResponse>(
      `${this.authBasePath}/check-email`,
      params,
    );

    return response.data;
  }

  async login(params: SignInLoginRequest): Promise<LoginResponse> {
    const response = await API.post<LoginResponse>(
      `${this.authBasePath}/login`,
      params,
    );

    return response.data;
  }

  async refresh(params: RefreshSessionRequest): Promise<RefreshSessionResponse> {
    const response = await API.post<RefreshSessionResponse>(
      `${this.authBasePath}/refresh`,
      params,
    );

    return response.data;
  }

  async logout(params: LogoutRequest): Promise<LogoutResponse> {
    const response = await API.post<LogoutResponse>(
      `${this.authBasePath}/logout`,
      params,
    );

    return response.data;
  }

  async me(): Promise<CurrentUserProfile> {
    const response = await API.get<CurrentUserProfile>(`${this.authBasePath}/me`);

    return response.data;
  }
}

export const authService = new AuthService();
