"use client";

import { useSession } from "next-auth/react";

export function useAuthProtected() {
  const user = useSession().data?.user;

  return user!;
}
