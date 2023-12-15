"use client";

import { Cat } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { type auth } from "~/lib/auth";
import { cn } from "~/lib/utils";
import { type RouterOutputs } from "~/trpc/shared";

type Props = {
  chat: RouterOutputs["chat"]["getMany"]["chats"][number];
  currentUser: Awaited<ReturnType<typeof auth>>;
};

export function ChatItem({ chat, currentUser }: Props) {
  const params = useParams();
  const isSelected = params.chatId === chat.id;

  const { id, type, users } = chat;

  const otherUsers = users.filter((user) => user.id !== currentUser.id);
  const chatImage = otherUsers[0]?.image;

  const chatTitle = () => {
    if (type !== "SINGLE") {
      return chat.users.map((user) => user.name).join(", ");
    }

    return otherUsers[0]?.name;
  };

  return (
    <li>
      <Link
        href={`/chats/${id}`}
        className={cn("relative flex items-center gap-2 p-2 hover:bg-muted")}
      >
        <Avatar>
          <AvatarImage src={chatImage ?? undefined} />
          <AvatarFallback>
            <Cat className="text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        {isSelected && (
          <div className="absolute bottom-0 left-0 top-0 w-1 bg-muted-foreground" />
        )}
        <div className="flex flex-col">
          <span className="text-sm">{chatTitle()}</span>
          <span className="text-xs text-muted-foreground">
            Последнее сообщение
          </span>
        </div>
      </Link>
    </li>
  );
}
