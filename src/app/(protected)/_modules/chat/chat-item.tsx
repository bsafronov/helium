"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "~/components/avatar";
import { type RouterOutputs } from "~/trpc/shared";
import { useActiveList } from "../user/use-active-list";
import { cn } from "~/lib/utils";

type Props = {
  chat: RouterOutputs["chat"]["getManyThisUser"]["chats"][number];
  currentUserId: string;
};

type ChatOptionKey = Props["chat"]["type"];
type ChatOptionValue = {
  title?: string | null;
  avatar?: string | null;
  link: string;
};
type ChatOption = Record<ChatOptionKey, ChatOptionValue>;

export function ChatItem({ chat, currentUserId }: Props) {
  const pathname = usePathname();
  const otherUserId =
    currentUserId === chat.firstUserId ? chat.secondUserId : chat.firstUserId;
  const online = useActiveList().isOnline;

  const chatOptions: ChatOption = {
    ONE_TO_ONE: {
      title: chat.users.filter((user) => user.id !== currentUserId)[0]?.name,
      avatar: chat.users.filter((user) => user.id !== currentUserId)[0]?.image,
      link: `/c/u/${otherUserId}`,
    },
    CHANNEL: {
      title: chat.title,
      avatar: null,
      link: `/c/c/${chat.id}`,
    },
    GROUP: {
      title: chat.title,
      avatar: null,
      link: `/c/g/${chat.id}`,
    },
  };
  const item = chatOptions[chat.type];

  const isActive = pathname === item.link;

  return (
    <li>
      <Link
        href={item.link}
        className={cn("relative flex w-full px-2 py-2 hover:bg-primary/10")}
      >
        <Avatar image={item.avatar} size="sm" online={online(otherUserId)} />

        {isActive && (
          <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-muted-foreground" />
        )}
        <div className="ml-2 flex w-full min-w-0 flex-col text-xs">
          <span className="truncate">{item.title}</span>
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
