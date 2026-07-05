"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import type { AuthContextValue, AuthProviderProps } from "./types";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: sessionData, isPending } = authClient.useSession();

  const session = useMemo(
    () => (sessionData as unknown as { session: Record<string, unknown> | null })?.session ?? null,
    [sessionData]
  );

  const user = useMemo(
    () => (sessionData as unknown as { user: Record<string, unknown> | null })?.user ?? null,
    [sessionData]
  );

  const signOut = useCallback(async () => {
    await authClient.signOut();
    window.location.href = "/";
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      isLoaded: !isPending,
      isSignedIn: !!session,
      signOut,
    }),
    [session, user, isPending, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
