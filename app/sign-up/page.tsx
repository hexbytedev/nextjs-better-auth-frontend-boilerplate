"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SignUpForm } from "@/components/auth/sign-up-form";

function SignUpFormWithCallback() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") || "/verify-email";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <SignUpForm showCardWrapper callbackURL={callbackURL} />
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={`/sign-in${callbackURL !== "/dashboard" ? `?callbackURL=${encodeURIComponent(callbackURL)}` : ""}`}
            className="text-foreground underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpFormWithCallback />
    </Suspense>
  );
}
