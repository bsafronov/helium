"use client";

import { Cat, LogOut, Settings } from "lucide-react";
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
  userImage?: string | null;
};
export function UserButton({ userImage }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={userImage ?? ""} />
          <AvatarFallback>
            <Cat className="text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild className="flex items-center gap-4">
          <Link href={"/profile/settings"}>
            <Settings className="h-4 w-4" />
            Настройки
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-4 text-destructive focus:text-destructive"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
