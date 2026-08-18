import { API } from "@/lib/config/axios.client";

import type {
  EmailCheckResponse,
  LoginResponse,
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
}

export const authService = new AuthService();
