"use client";

import { Shield } from "lucide-react";
import { SignInButton } from "@/components/auth/sign-in-button";
import { SignUpButton } from "@/components/auth/sign-up-button";
import { UserButton } from "@/components/auth/user-button";
import { Show } from "@/components/auth/show";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Shield className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">Better Auth Client</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          A Next.js client application using Better Auth with a separate
          authentication server.
        </p>

        <Show when="signed-out">
          <div className="flex gap-4 justify-center">
            <SignInButton />
            <SignUpButton />
          </div>
        </Show>

        <Show when="signed-in">
          <div className="flex flex-col items-center gap-4">
            <UserButton />
            <p className="text-sm text-muted-foreground">
              You are signed in
            </p>
          </div>
        </Show>
      </div>
    </div>
  );
}
