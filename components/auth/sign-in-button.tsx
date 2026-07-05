"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import type { ButtonProps } from "./types";

export function SignInButton({
  mode = "modal",
  redirectUrl = "/sign-in",
  children,
}: ButtonProps) {
  const { openSignIn } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (mode === "modal") {
      openSignIn();
    } else {
      router.push(redirectUrl);
    }
  };

  return (
    <Button onClick={handleClick} variant="default">
      {children ?? (
        <>
          <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
          Sign In
        </>
      )}
    </Button>
  );
}
