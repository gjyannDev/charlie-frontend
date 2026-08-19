import { NextResponse, type NextRequest } from "next/server";

import {
  AUTH_ROLE_HINT_COOKIE,
  AUTH_SESSION_HINT_COOKIE,
  canRoleAccessRoute,
  getAuthSessionRoute,
  getRoleLandingRoute,
  isPublicAuthRoute,
} from "./src/modules/auth/session/auth-session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSessionHint =
    request.cookies.get(AUTH_SESSION_HINT_COOKIE)?.value === "1";
  const roleHint = request.cookies.get(AUTH_ROLE_HINT_COOKIE)?.value ?? null;

  if (hasSessionHint && isPublicAuthRoute(pathname)) {
    return redirectTo(request, getRoleLandingRoute(roleHint));
  }

  const protectedRoute = getAuthSessionRoute(pathname);

  if (
    protectedRoute &&
    hasSessionHint &&
    !canRoleAccessRoute(roleHint, protectedRoute)
  ) {
    return redirectTo(request, getRoleLandingRoute(roleHint));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)",
  ],
};

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";

  return NextResponse.redirect(url);
}
