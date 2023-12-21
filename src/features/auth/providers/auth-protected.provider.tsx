"use client";

import { useSession } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export function AuthProtectedProvider({ children }: Props) {
  const user = useSession().data?.user;

  if (!user) {
    return null;
    // TODO: Loader
  }

  return <>{children}</>;
}
