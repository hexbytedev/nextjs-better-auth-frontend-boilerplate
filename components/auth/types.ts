import type { ReactNode } from "react";

export type ModalView = "signin" | "signup" | null;

export interface AuthContextValue {
  session: Record<string, unknown> | null;
  user: Record<string, unknown> | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  openSignIn: () => void;
  openSignUp: () => void;
  close: () => void;
  signOut: () => Promise<void>;
  modalView: ModalView;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface SignInFormProps {
  onSuccess?: () => void;
  showCardWrapper?: boolean;
}

export interface SignUpFormProps {
  onSuccess?: () => void;
  showCardWrapper?: boolean;
}

export interface ButtonProps {
  mode?: "modal" | "redirect";
  redirectUrl?: string;
  children?: ReactNode;
}
