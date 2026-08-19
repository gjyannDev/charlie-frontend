import type { CurrentUserProfile } from "../types/auth.types";

import {
  AUTH_ROLE_HINT_COOKIE,
  AUTH_SESSION_HINT_COOKIE,
} from "./auth-session-routes";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export function writeAuthSessionHint(profile: CurrentUserProfile) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = serializeCookie(AUTH_SESSION_HINT_COOKIE, "1");
  document.cookie = serializeCookie(AUTH_ROLE_HINT_COOKIE, profile.role);
}

export function clearAuthSessionHint() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = serializeCookie(AUTH_SESSION_HINT_COOKIE, "", 0);
  document.cookie = serializeCookie(AUTH_ROLE_HINT_COOKIE, "", 0);
}

function serializeCookie(
  name: string,
  value: string,
  maxAge = COOKIE_MAX_AGE_SECONDS,
) {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

