"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  canRoleAccessRoute,
  getRoleLandingRoute,
} from "../session/auth-session";
import { useAuthSessionStore } from "../store/auth.store";
import type { UserRole } from "../types/auth.types";

type RoleGuardProps = {
  children: React.ReactNode;
  allowedRoles?: readonly UserRole[];
  redirectTo?: string;
  fallback?: React.ReactNode;
};

export function RoleGuard({
  children,
  allowedRoles,
  redirectTo,
  fallback,
}: RoleGuardProps) {
  const status = useAuthSessionStore((state) => state.status);
  const currentProfile = useAuthSessionStore((state) => state.currentProfile);
  const recoveryReason = useAuthSessionStore((state) => state.recoveryReason);

  if (status === "idle" || status === "bootstrapping") {
    return <GuardState title="Verifying access" loading />;
  }

  if (status === "recovery") {
    if (fallback) {
      return fallback;
    }

    return (
      <GuardState
        title="Session recovery needed"
        description={getRecoveryDescription(recoveryReason)}
        actionLabel="Sign in again"
        actionHref="/signin"
      />
    );
  }

  if (status !== "authenticated" || !currentProfile) {
    if (fallback) {
      return fallback;
    }

    return (
      <GuardState
        title="Sign in required"
        description="You need an active Charlie session to view this page."
        actionLabel="Go to signin"
        actionHref="/signin"
      />
    );
  }

  const route = {
    path: getRoleLandingRoute(currentProfile.role),
    allowedRoles,
  };

  if (!canRoleAccessRoute(currentProfile.role, route)) {
    if (fallback) {
      return fallback;
    }

    return (
      <GuardState
        title="Role access required"
        description="Your current Charlie role does not have access to this page."
        actionLabel="Go to your dashboard"
        actionHref={redirectTo || getRoleLandingRoute(currentProfile.role)}
      />
    );
  }

  return children;
}

function GuardState({
  title,
  description,
  actionHref,
  actionLabel,
  loading = false,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  loading?: boolean;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Charlie Auth
        </p>
        <div className="mt-3 flex items-center gap-3">
          {loading ? (
            <Loader2 className="size-5 animate-spin text-primary" />
          ) : null}
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        </div>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
        {actionHref && actionLabel ? (
          <div className="mt-6">
            <Button asChild>
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          </div>
        ) : null}
      </section>
    </main>
  );
}

function getRecoveryDescription(recoveryReason: string | null) {
  if (recoveryReason === "profile-failed") {
    return "Your session token was accepted, but Charlie could not load your profile. Stay on this page and sign in again to recover.";
  }

  if (recoveryReason === "refresh-failed") {
    return "Charlie could not refresh your saved session. Stay on this page and sign in again to recover.";
  }

  return "Charlie could not restore your session. Stay on this page and sign in again to recover.";
}

