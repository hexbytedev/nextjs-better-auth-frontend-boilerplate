"use client";

import { useAuth } from "./auth-provider";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function AuthModal() {
  const { modalView, close } = useAuth();

  return (
    <Dialog
      open={modalView !== null}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent className="p-0 gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>
            {modalView === "signin" ? "Sign In" : "Sign Up"}
          </DialogTitle>
          <DialogDescription>
            {modalView === "signin"
              ? "Enter your credentials to access your account"
              : "Enter your details to create your account"}
          </DialogDescription>
        </DialogHeader>
        {modalView === "signin" && (
          <SignInForm onSuccess={close} showCardWrapper={false} />
        )}
        {modalView === "signup" && (
          <SignUpForm onSuccess={close} showCardWrapper={false} />
        )}
      </DialogContent>
    </Dialog>
  );
}
