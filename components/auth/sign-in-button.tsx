"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import type { ButtonProps } from "./types";

export function SignInButton({
  redirectUrl = "/sign-in",
  children,
}: ButtonProps) {
  return (
    <Link href={redirectUrl}>
      {children ?? (
        <Button variant="default">
          <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
          Sign In
        </Button>
      )}
    </Link>
  );
}
