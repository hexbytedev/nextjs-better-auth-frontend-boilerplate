"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import type { AuthContextValue, AuthProviderProps, ModalView } from "./types";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: sessionData, isPending } = authClient.useSession();
  const [modalView, setModalView] = useState<ModalView>(null);

  const session = (sessionData as unknown as { session: Record<string, unknown> | null })?.session ?? null;
  const user = (sessionData as unknown as { user: Record<string, unknown> | null })?.user ?? null;

  const openSignIn = useCallback(() => setModalView("signin"), []);
  const openSignUp = useCallback(() => setModalView("signup"), []);
  const close = useCallback(() => setModalView(null), []);

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
      openSignIn,
      openSignUp,
      close,
      signOut,
      modalView,
    }),
    [session, user, isPending, openSignIn, openSignUp, close, signOut, modalView]
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
