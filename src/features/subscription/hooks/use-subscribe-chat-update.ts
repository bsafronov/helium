"use client";

import { type Message } from "@prisma/client";
import { api } from "~/trpc/react";

type FnProps = {
  chatId: string;
  message: Message;
};

export function useSubscribeChatUpdate() {
  const ctx = api.useUtils();

  const handleUpdateChat = ({ chatId, message }: FnProps) => {
    const chats = ctx.chat.getManyThisUser.getData()?.chats;

    const updatedChats = chats!.map((chat) => {
      if (chat.id !== chatId) {
        return chat;
      }

      return {
        ...chat,
        messages: [message],
      };
    });

    ctx.chat.getManyThisUser.setData(undefined, { chats: updatedChats });
  };

  return handleUpdateChat;
}
