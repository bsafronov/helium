"use client";

import { useSession } from "next-auth/react";

export function useAuth() {
  const user = useSession().data?.user;

  return user;
}
