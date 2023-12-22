"use client";

import { api } from "~/trpc/react";
import { ChatItem } from "./chat-item";
import { useAuthProtected } from "~/lib/next-auth/client";

export function ChatList() {
  const { data } = api.chat.getManyThisUser.useQuery();
  const chats = data?.chats ?? [];
  const userId = useAuthProtected().id;

  if (chats?.length === 0 || !userId) {
    return null;
  }

  return (
    <div className="border-b">
      <div className="border-b bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
        Чаты
      </div>
      <ul className="divide-y">
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} currentUserId={userId} />
        ))}
      </ul>
    </div>
  );
}
