"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import type { ButtonProps } from "./types";

export function SignUpButton({
  redirectUrl = "/sign-up",
  children,
}: ButtonProps) {
  return (
    <Link href={redirectUrl}>
      {children ?? (
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
          Sign Up
        </Button>
      )}
    </Link>
  );
}
