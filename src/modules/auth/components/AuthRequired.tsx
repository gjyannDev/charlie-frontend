"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useAuthSessionStore } from "../store/auth.store";
import type { UserRole } from "../types/auth.types";
import {
  canRoleAccessRoute,
  getRoleLandingRoute,
} from "../session/auth-session-routes";

type AuthRequiredProps = {
  children: React.ReactNode;
  allowedRoles?: readonly UserRole[];
};

export function AuthRequired({ children, allowedRoles }: AuthRequiredProps) {
  const status = useAuthSessionStore((state) => state.status);
  const currentProfile = useAuthSessionStore((state) => state.currentProfile);
  const recoveryReason = useAuthSessionStore((state) => state.recoveryReason);

  if (status === "idle" || status === "bootstrapping") {
    return (
      <AuthSessionShell
        title="Restoring your session"
        description="Charlie is checking your saved session before loading this page."
      />
    );
  }

  if (status === "recovery") {
    return (
      <AuthSessionShell
        title="Session recovery needed"
        description={getRecoveryDescription(recoveryReason)}
        action={
          <Button asChild>
            <Link href="/signin">Sign in again</Link>
          </Button>
        }
      />
    );
  }

  if (status !== "authenticated" || !currentProfile) {
    return (
      <AuthSessionShell
        title="Sign in required"
        description="You need an active Charlie session to view this page."
        action={
          <Button asChild>
            <Link href="/signin">Go to signin</Link>
          </Button>
        }
      />
    );
  }

  const route = {
    path: getRoleLandingRoute(currentProfile.role),
    allowedRoles,
  };

  if (!canRoleAccessRoute(currentProfile.role, route)) {
    return (
      <AuthSessionShell
        title="Role access required"
        description="Your current Charlie role does not have access to this page."
        action={
          <Button asChild variant="outline">
            <Link href={getRoleLandingRoute(currentProfile.role)}>
              Go to your dashboard
            </Link>
          </Button>
        }
      />
    );
  }

  return children;
}

function AuthSessionShell({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Charlie Auth
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        {action ? <div className="mt-6">{action}</div> : null}
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

