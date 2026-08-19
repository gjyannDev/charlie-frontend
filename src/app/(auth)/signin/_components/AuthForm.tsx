"use client";

import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup, FieldSet } from "@/components/ui/field";
import {
  useCheckEmailMutation,
  useSignInMutation,
} from "@/modules/auth/queries/auth.queries";
import { authSessionStore } from "@/modules/auth/store/auth.store";
import {
  signInCredentialsSchema,
  signInEmailSchema,
  signInLoginRequestSchema,
} from "@/modules/auth/schemas/auth.schema";
import { getRoleLandingRoute } from "@/modules/auth/session/auth-session";
import type {
  SignInCredentialsFormValues,
  SignInEmailFormValues,
} from "@/modules/auth/types/auth.types";
import { PasswordField } from "@/shared/components/forms/PasswordField";
import { TextField } from "@/shared/components/forms/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginStep = "email" | "credentials";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export default function AuthForm() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>("email");
  const [recognizedEmail, setRecognizedEmail] = useState("");
  const [emailNotFound, setEmailNotFound] = useState(false);

  const checkEmailMutation = useCheckEmailMutation();
  const signInMutation = useSignInMutation();

  const emailForm = useForm<SignInEmailFormValues>({
    resolver: zodResolver(signInEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const credentialsForm = useForm<SignInCredentialsFormValues>({
    resolver: zodResolver(signInCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitEmail = emailForm.handleSubmit(async (values) => {
    setEmailNotFound(false);

    const response = await checkEmailMutation.mutateAsync(values);

    if (!response.exists) {
      setEmailNotFound(true);
      return;
    }

    setRecognizedEmail(values.email);
    credentialsForm.reset({
      email: values.email,
      password: "",
      confirmPassword: "",
    });
    setStep("credentials");
  });

  const submitCredentials = credentialsForm.handleSubmit(async (values) => {
    const loginRequest = signInLoginRequestSchema.parse({
      email: values.email,
      password: values.password,
    });

    await signInMutation.mutateAsync(loginRequest);

    const currentProfile = authSessionStore.getState().currentProfile;
    router.replace(getRoleLandingRoute(currentProfile?.role));
  });

  const isCheckingEmail =
    checkEmailMutation.isPending || emailForm.formState.isSubmitting;
  const isSigningIn = signInMutation.isPending || credentialsForm.formState.isSubmitting;

  if (step === "credentials") {
    return (
      <form className="space-y-6" noValidate onSubmit={submitCredentials}>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Continuing with recognized email
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Finish signing in with the member account connected to this email.
          </p>
        </div>

        <FieldSet disabled={isSigningIn}>
          <FieldGroup>
            <TextField
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              register={credentialsForm.register}
              error={credentialsForm.formState.errors.email?.message}
              disabled
            />
            <PasswordField
              name="password"
              label="Password"
              placeholder="Enter password"
              autoComplete="current-password"
              register={credentialsForm.register}
              error={credentialsForm.formState.errors.password?.message}
              disabled={isSigningIn}
            />
            <PasswordField
              name="confirmPassword"
              label="Confirm password"
              placeholder="Confirm password"
              autoComplete="current-password"
              register={credentialsForm.register}
              error={credentialsForm.formState.errors.confirmPassword?.message}
              disabled={isSigningIn}
            />
          </FieldGroup>
        </FieldSet>

        {signInMutation.isError && (
          <FieldError>
            {getErrorMessage(signInMutation.error, "Unable to sign in. Try again.")}
          </FieldError>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-11 flex-1"
            disabled={isSigningIn}
            onClick={() => {
              signInMutation.reset();
              credentialsForm.reset({
                email: "",
                password: "",
                confirmPassword: "",
              });
              setRecognizedEmail("");
              setStep("email");
            }}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Change email
          </Button>
          <Button type="submit" size="lg" className="h-11 flex-1" disabled={isSigningIn}>
            {isSigningIn ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        <p className="sr-only" aria-live="polite">
          Continuing with {recognizedEmail}
        </p>
      </form>
    );
  }

  return (
    <form className="space-y-6" noValidate onSubmit={submitEmail}>
      <div className="space-y-2">
        <p className="text-sm font-medium text-primary">Member login</p>
        <h1 className="text-3xl font-semibold tracking-normal text-foreground">
          Start with your email
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          We will check for your member account before asking for credentials.
        </p>
      </div>

      <FieldSet disabled={isCheckingEmail}>
        <FieldGroup>
          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder="member@example.com"
            autoComplete="email"
            register={emailForm.register}
            error={emailForm.formState.errors.email?.message}
            disabled={isCheckingEmail}
          />
        </FieldGroup>
      </FieldSet>

      {emailNotFound && (
        <FieldError>
          We could not find a member account for that email. Check the address
          or contact support.
        </FieldError>
      )}

      {checkEmailMutation.isError && (
        <FieldError>
          {getErrorMessage(
            checkEmailMutation.error,
            "Unable to check this email. Try again.",
          )}
        </FieldError>
      )}

      <Button type="submit" size="lg" className="h-11 w-full" disabled={isCheckingEmail}>
        {isCheckingEmail ? "Checking email..." : "Continue"}
        {!isCheckingEmail && <ArrowRight className="size-4" aria-hidden="true" />}
      </Button>
    </form>
  );
}
