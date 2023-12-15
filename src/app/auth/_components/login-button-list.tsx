"use client";

import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";
import { FaDiscord, FaYandex } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function LoginButtonList() {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <Button
          onClick={() => signIn("discord")}
          className="gap-2"
          variant={"outline"}
        >
          <FaDiscord className={"h-6 w-6 text-indigo-600"} />
          Войти через Discord
        </Button>
      </li>
      <li>
        <Button
          onClick={() => signIn("google")}
          className="gap-2"
          variant={"outline"}
        >
          <FcGoogle className={"h-6 w-6"} />
          Войти через Google
        </Button>
      </li>
      <li>
        <Button
          onClick={() => signIn("yandex")}
          className="gap-2"
          variant={"outline"}
        >
          <FaYandex className={"h-6 w-6 text-red-600"} />
          Войти через Yandex
        </Button>
      </li>
    </ul>
  );
}
