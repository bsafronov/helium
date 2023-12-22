"use client";

import { useAuth } from "~/lib/next-auth/client";

export default function Page() {
  const user = useAuth();

  console.log(user);

  return <></>;
}
