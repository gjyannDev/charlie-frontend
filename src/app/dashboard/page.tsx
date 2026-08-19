import { RoleGuard } from "@/modules/auth/components/RoleGuard";

export default function DashboardPage() {
  return (
    <RoleGuard>
      <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-4xl rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Charlie Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Member workspace
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            You are signed in. This is the current protected member landing
            page for the auth-session flow.
          </p>
        </section>
      </main>
    </RoleGuard>
  );
}
