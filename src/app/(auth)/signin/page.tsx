import AuthForm from "./_components/AuthForm";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,hsl(var(--background))_0%,hsl(var(--muted))_48%,hsl(var(--secondary))_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="mx-auto w-full max-w-md rounded-lg border border-border bg-background/95 p-6 shadow-sm sm:p-8">
          <AuthForm />
        </section>

        <section
          className="hidden min-h-155 overflow-hidden rounded-lg border border-border bg-foreground text-background shadow-sm lg:block"
          aria-label="Charlie member login visual"
        >
          <div className="flex h-full min-h-155 flex-col justify-between bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_45%)] p-10">
            <div>
              <p className="text-sm font-medium uppercase tracking-normal text-background/70">
                Charlie Members
              </p>
              <h2 className="mt-5 max-w-sm text-4xl font-semibold tracking-normal">
                A focused sign-in path for recognized accounts.
              </h2>
            </div>

            <div className="grid gap-4">
              <div className="rounded-lg border border-background/15 bg-background/10 p-5">
                <p className="text-sm text-background/70">Step 1</p>
                <p className="mt-2 text-xl font-medium">
                  Confirm the email first.
                </p>
              </div>
              <div className="rounded-lg border border-background/15 bg-background/10 p-5">
                <p className="text-sm text-background/70">Step 2</p>
                <p className="mt-2 text-xl font-medium">
                  Continue with credentials for that account.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
