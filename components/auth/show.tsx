"use client";

import type { ReactNode } from "react";
import { useAuth } from "./auth-provider";

interface ShowProps {
  when: "signed-in" | "signed-out";
  fallback?: ReactNode;
  children: ReactNode;
}

export function Show({ when, fallback, children }: ShowProps) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  const shouldRender =
    (when === "signed-in" && isSignedIn) ||
    (when === "signed-out" && !isSignedIn);

  return <>{shouldRender ? children : fallback ?? null}</>;
}
