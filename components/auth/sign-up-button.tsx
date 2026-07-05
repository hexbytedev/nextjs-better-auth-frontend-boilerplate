"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import type { ButtonProps } from "./types";

export function SignUpButton({
  mode = "modal",
  redirectUrl = "/sign-up",
  children,
}: ButtonProps) {
  const { openSignUp } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (mode === "modal") {
      openSignUp();
    } else {
      router.push(redirectUrl);
    }
  };

  return (
    <Button onClick={handleClick} variant="outline">
      {children ?? (
        <>
          <UserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
          Sign Up
        </>
      )}
    </Button>
  );
}
