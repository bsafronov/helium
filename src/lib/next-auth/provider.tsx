"use client";

import { SessionProvider } from "next-auth/react";
import { useAuth } from "./client";

type Props = {
  children?: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function AuthProtectedProvider({ children }: Props) {
  const user = useAuth();

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
