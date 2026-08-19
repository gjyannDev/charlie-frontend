import type { CurrentUserProfile, UserRole } from "../types/auth.types";

export const AUTH_SESSION_HINT_COOKIE = "charlie_auth_hint";
export const AUTH_ROLE_HINT_COOKIE = "charlie_auth_role";

export const PUBLIC_AUTH_ROUTES = ["/signin"] as const;

export type AuthSessionRoute = {
  path: string;
  allowedRoles?: readonly string[];
};

export const AUTH_SESSION_ROUTES = [
  {
    path: "/dashboard",
  },
  {
    path: "/admin",
    allowedRoles: ["admin"],
  },
] as const satisfies readonly AuthSessionRoute[];

const DEFAULT_AUTHENTICATED_ROUTE = "/dashboard";
const ROLE_LANDING_ROUTES: Record<string, string> = {
  admin: "/admin/dashboard",
  user: DEFAULT_AUTHENTICATED_ROUTE,
};
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export function normalizeRole(role: UserRole | null | undefined) {
  return role?.trim().toLowerCase() || null;
}

export function getRoleLandingRoute(role: UserRole | null | undefined) {
  const normalizedRole = normalizeRole(role);

  if (!normalizedRole) {
    return DEFAULT_AUTHENTICATED_ROUTE;
  }

  return ROLE_LANDING_ROUTES[normalizedRole] ?? DEFAULT_AUTHENTICATED_ROUTE;
}

export function isPublicAuthRoute(pathname: string) {
  return PUBLIC_AUTH_ROUTES.some((route) => isRouteMatch(pathname, route));
}

export function getAuthSessionRoute(pathname: string) {
  return AUTH_SESSION_ROUTES.find((route) =>
    isRouteMatch(pathname, route.path),
  );
}

export function canRoleAccessRoute(
  role: UserRole | null | undefined,
  route: AuthSessionRoute,
) {
  if (!route.allowedRoles?.length) {
    return true;
  }

  const normalizedRole = normalizeRole(role);

  return Boolean(
    normalizedRole &&
      route.allowedRoles.some((allowedRole) => allowedRole === normalizedRole),
  );
}

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

function isRouteMatch(pathname: string, routePath: string) {
  return pathname === routePath || pathname.startsWith(`${routePath}/`);
}

function serializeCookie(
  name: string,
  value: string,
  maxAge = COOKIE_MAX_AGE_SECONDS,
) {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

