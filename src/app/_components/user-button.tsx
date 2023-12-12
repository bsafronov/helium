"use client";

import { LogOut, Settings, UserRound } from "lucide-react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

type Props = {
  user: Session["user"];
};

export function UserButton({ user }: Props) {
  return (
    <div className="flex w-full items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback>
              {user.name ? user.name[0] : <UserRound />}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>
            <Link href={"/profile"} className="flex items-center gap-4">
              <Settings className="h-4 w-4" />
              Профиль
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            <Link
              href={"/profile"}
              className="text-destructive flex items-center gap-4"
            >
              <LogOut className="h-4 w-4" />
              Выйти
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex w-full flex-col">
        <span className="text-muted-foreground text-xs">@{user.name}</span>
        <span className="w-[12rem] truncate text-sm">{user.email}</span>
      </div>
    </div>
  );
}
