"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "~/components/avatar";
import { cn } from "~/lib/utils";
import { type RouterOutputs } from "~/trpc/shared";

type Props = {
  chat: RouterOutputs["chat"]["getManyThisUser"]["chats"][number];
  currentUserId: string;
};

export function ChatItem({ chat, currentUserId }: Props) {
  const pathname = usePathname();

  const otherUserId =
    currentUserId === chat.firstUserId ? chat.secondUserId : chat.firstUserId;

  const title = () => {
    switch (chat.type) {
      case "ONE_TO_ONE":
        return chat.users.filter((user) => user.id !== currentUserId)[0]?.name;
      case "CHANNEL":
      case "GROUP":
        return chat.title;
    }
  };

  const avatar = () => {
    switch (chat.type) {
      case "ONE_TO_ONE":
        return chat.users.filter((user) => user.id !== currentUserId)[0]?.image;
      case "CHANNEL":
      case "GROUP":
        return null;
    }
  };

  const link = () => {
    switch (chat.type) {
      case "ONE_TO_ONE":
        return `/uc/${otherUserId}`;
      case "GROUP":
        return `/gc/${chat.id}`;
      case "CHANNEL":
        return `/cc/${chat.id}`;
    }
  };

  const isActive = pathname === link();

  return (
    <li>
      <Link
        href={link()}
        className={cn("relative flex w-full px-2 py-2 hover:bg-primary/10")}
      >
        <Avatar image={avatar()} size="sm" />
        {isActive && (
          <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-muted-foreground" />
        )}
        <div className="ml-2 flex w-full min-w-0 flex-col text-xs">
          <span className="truncate">{title()}</span>
          <div className="flex w-full">
            <span className="grow truncate text-muted-foreground">
              {chat.messages[0]?.content}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
