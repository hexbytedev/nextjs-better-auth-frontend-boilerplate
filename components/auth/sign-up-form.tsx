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
import { UserPlus, Loader2, CircleAlert } from "lucide-react";
import { VerificationPending } from "@/components/verification-pending";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { SignUpFormProps } from "./types";

const ERROR_MAP: Record<string, string> = {
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "An account with this email already exists. Please sign in instead.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PASSWORD: "Please enter a valid password.",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters.",
  PASSWORD_TOO_LONG: "Password is too long. Please use 128 characters or fewer.",
  FAILED_TO_CREATE_USER: "Failed to create your account. Please try again.",
  FAILED_TO_CREATE_SESSION:
    "Account created but sign-in failed. Please try signing in.",
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

export function SignUpForm({ onSuccess, showCardWrapper = true }: SignUpFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signUpError, data } = await authClient.signUp.email(
      { name: `${firstName} ${lastName}`, email, password },
      {
        onError: (ctx) => {
          setError(getErrorMessage(ctx.error));
        },
      }
    );

    if (signUpError) {
      setError(getErrorMessage(signUpError));
      setLoading(false);
      return;
    }

    if (!data?.token) {
      setSignedUp(true);
    } else {
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = "/dashboard";
      }
    }
    setLoading(false);
  };

  if (signedUp) {
    return <VerificationPending email={email} />;
  }

  const form = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error ? (
        <Alert variant="destructive" aria-live="polite">
          <CircleAlert />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="auth-sign-up-firstName">First name</Label>
          <Input
            id="auth-sign-up-firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John…"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="auth-sign-up-lastName">Last name</Label>
          <Input
            id="auth-sign-up-lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe…"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="auth-sign-up-email">Email</Label>
        <Input
          id="auth-sign-up-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com…"
          autoComplete="email"
          spellCheck={false}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="auth-sign-up-password">Password</Label>
        <Input
          id="auth-sign-up-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min 8 characters…"
          autoComplete="new-password"
          required
          minLength={8}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <UserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        {loading ? "Creating account…" : "Sign Up"}
      </Button>
    </form>
  );

  if (!showCardWrapper) {
    return form;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <UserPlus className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your details to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>{form}</CardContent>
    </Card>
  );
}
