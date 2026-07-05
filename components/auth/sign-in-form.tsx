"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn, Loader2, CircleAlert } from "lucide-react";
import { VerificationPending } from "@/components/verification-pending";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { SignInFormProps } from "./types";

const ERROR_MAP: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password. Please try again.",
  EMAIL_NOT_VERIFIED: "Please verify your email before signing in.",
  INVALID_EMAIL: "Please enter a valid email address.",
  FAILED_TO_CREATE_SESSION: "Something went wrong. Please try again.",
};

function getErrorMessage(error: unknown): string {
  const code = (error as unknown as { code?: string })?.code;
  const status = (error as unknown as { status?: number })?.status;

  if (status === 429) return "Too many attempts. Please try again later.";
  if (code && ERROR_MAP[code]) return ERROR_MAP[code];
  return (
    (error as unknown as { message?: string })?.message ??
    "Something went wrong. Please try again."
  );
}

function isEmailNotVerified(error: unknown): boolean {
  return (error as unknown as { code?: string })?.code === "EMAIL_NOT_VERIFIED";
}

export function SignInForm({ onSuccess, showCardWrapper = true }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setShowResend(false);

    const { error: signInError } = await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          } else {
            window.location.href = "/dashboard";
          }
        },
        onError: (ctx) => {
          setError(getErrorMessage(ctx.error));
          setShowResend(isEmailNotVerified(ctx.error));
        },
      }
    );

    if (signInError) {
      setError(getErrorMessage(signInError));
      setShowResend(isEmailNotVerified(signInError));
    }
    setLoading(false);
  };

  const form = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive" aria-live="polite">
          <CircleAlert />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="auth-sign-in-email">Email</Label>
        <Input
          id="auth-sign-in-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          spellCheck={false}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="auth-sign-in-password">Password</Label>
        <Input
          id="auth-sign-in-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          autoComplete="current-password"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        {loading ? "Signing in\u2026" : "Sign In"}
      </Button>
    </form>
  );

  if (!showCardWrapper) {
    return (
      <>
        {form}
        {showResend && <VerificationPending variant="inline" email={email} />}
      </>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <LogIn className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {form}
        {showResend && <VerificationPending variant="inline" email={email} />}
      </CardContent>
    </Card>
  );
}
