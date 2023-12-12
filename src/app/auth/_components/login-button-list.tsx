"use client";

import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

export function LoginButtonList() {
  return (
    <ul className="flex flex-wrap gap-4">
      <li>
        <Button
          onClick={() =>
            signIn("discord", { callbackUrl: "/", redirect: true })
          }
          className="gap-2"
          variant={"outline"}
        >
          <FaDiscord className={"h-6 w-6 text-indigo-600"} />
          Войти через Discord
        </Button>
      </li>
    </ul>
  );
}
