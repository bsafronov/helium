"use client";

import type { Message } from "@prisma/client";
import { useEffect } from "react";
import { pusherClient } from "~/lib/pusher";
import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";
import { useAuth } from "../use-auth";

type NavChat = RouterOutputs["chat"]["getManyThisUser"]["chats"][number];

export function useUserSubscription() {
  const userId = useAuth()?.id;
  const ctx = api.useUtils();
  const data = ctx.chat.getManyThisUser;
  const chats = data.getData()?.chats;

  const handleNewChat = ({ chat }: { chat: NavChat }) => {
    data.setData(undefined, {
      chats: [chat, ...chats!],
    });
  };

  const handleUpdateChat = ({
    chatId,
    message,
  }: {
    chatId: string;
    message: Message;
  }) => {
    const updatedChats = chats!.map((chat) => {
      if (chat.id !== chatId) {
        return chat;
      }

      return {
        ...chat,
        messages: [message],
      };
    });

    data.setData(undefined, { chats: updatedChats });
  };

  const handleDeleteChat = () => {
    //
  };

  useEffect(() => {
    if (!userId || !chats) return;

    pusherClient.subscribe(userId);
    pusherClient.bind("chat:new", handleNewChat);
    pusherClient.bind("chat:update", handleUpdateChat);
    pusherClient.bind("chat:delete", handleDeleteChat);

    return () => {
      pusherClient.unsubscribe(userId);
      pusherClient.unbind("chat:new", handleNewChat);
      pusherClient.unbind("chat:update", handleUpdateChat);
      pusherClient.unbind("chat:delete", handleDeleteChat);
    };
  }, [userId, chats]);
}
