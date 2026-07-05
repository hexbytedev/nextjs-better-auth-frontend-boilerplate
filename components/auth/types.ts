import type { ReactNode } from "react";

export interface AuthContextValue {
  session: Record<string, unknown> | null;
  user: Record<string, unknown> | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  signOut: () => Promise<void>;
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
  redirectUrl?: string;
  children?: ReactNode;
}
