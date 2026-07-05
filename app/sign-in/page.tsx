"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";

function SignInFormWithCallback() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") || "/dashboard";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <SignInForm showCardWrapper />
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href={`/sign-up${callbackURL !== "/dashboard" ? `?callbackURL=${encodeURIComponent(callbackURL)}` : ""}`}
            className="text-foreground underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInFormWithCallback />
    </Suspense>
  );
}
