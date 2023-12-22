"use client";

import { useSession } from "next-auth/react";

export function useAuth() {
  const session = useSession();

  return session.data?.user;
}

export function useAuthProtected() {
  return useAuth()!;
}
