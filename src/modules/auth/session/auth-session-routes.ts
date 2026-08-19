import type { UserRole } from "../types/auth.types";

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

function isRouteMatch(pathname: string, routePath: string) {
  return pathname === routePath || pathname.startsWith(`${routePath}/`);
}

