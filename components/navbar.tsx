"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { Show, UserButton, SignInButton, SignUpButton } from "@/components/auth";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Shield className="h-5 w-5" aria-hidden="true" />
          <span>Better Auth</span>
        </Link>

        <nav className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </nav>
      </div>
    </header>
  );
}
