import { clearAuthSessionHint } from "@/modules/auth/session/auth-session-hints";
import { authSessionStore } from "@/modules/auth/store/auth.store";
import type { LoginResponse } from "@/modules/auth/types/auth.types";
import axios, {
  AxiosHeaders,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    _authRetry?: boolean;
    _skipAuthRefresh?: boolean;
  }
}

const REQUEST_TIMEOUT_MS = 15_000;
const AUTH_EXPIRED_STATUSES = new Set([401, 498]);
const PUBLIC_AUTH_PATHS = [
  "/auth/check-email",
  "/auth/login",
  "/auth/refresh",
  "/auth/logout",
];

// const PUBLIC_ROUTES = ["/", "/admin/signin", "/forgot-password"];

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    Accept: "application/json",
  },
};

export const API = axios.create(options);

type AuthRequestConfig = InternalAxiosRequestConfig & {
  _authRetry?: boolean;
  _skipAuthRefresh?: boolean;
};

let refreshRequest: Promise<LoginResponse> | null = null;

function isPublicAuthRequest(url?: string) {
  if (!url) {
    return false;
  }

  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path));
}

function shouldAttachAccessToken(config: AuthRequestConfig) {
  return !config._skipAuthRefresh && !isPublicAuthRequest(config.url);
}

function shouldRefresh(error: AxiosError) {
  const config = error.config as AuthRequestConfig | undefined;
  const status = error.response?.status;

  return Boolean(
    config &&
      status &&
      AUTH_EXPIRED_STATUSES.has(status) &&
      !config._authRetry &&
      !config._skipAuthRefresh &&
      !isPublicAuthRequest(config.url),
  );
}

function getRefreshRequest() {
  if (refreshRequest) {
    return refreshRequest;
  }

  const refreshToken = authSessionStore.getState().refreshToken;

  if (!refreshToken) {
    authSessionStore.getState().enterRecovery("refresh-failed");
    clearAuthSessionHint();
    return Promise.reject(new Error("Refresh token is unavailable"));
  }

  refreshRequest = API.post<LoginResponse>(
    "/auth/refresh",
    { refresh_token: refreshToken },
    { _skipAuthRefresh: true },
  )
    .then((response) => {
      authSessionStore.getState().applyRefreshResponse(response.data);
      return response.data;
    })
    .catch((error) => {
      authSessionStore.getState().enterRecovery("refresh-failed");
      clearAuthSessionHint();
      throw error;
    })
    .finally(() => {
      refreshRequest = null;
    });

  return refreshRequest;
}

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const authConfig = config as AuthRequestConfig;

  if (!shouldAttachAccessToken(authConfig)) {
    return config;
  }

  const { accessToken, tokenType } = authSessionStore.getState();

  if (!accessToken) {
    return config;
  }

  const headers = AxiosHeaders.from(config.headers);
  headers.set("Authorization", `${tokenType || "bearer"} ${accessToken}`);
  config.headers = headers;

  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!shouldRefresh(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as AuthRequestConfig;
    originalRequest._authRetry = true;

    try {
      await getRefreshRequest();
      return API(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);
