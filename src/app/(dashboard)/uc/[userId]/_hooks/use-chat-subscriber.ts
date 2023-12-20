"use client";

import { useEffect } from "react";
import { pusherClient } from "~/lib/pusher";
import { type UCMessage } from "../_types";
import { api } from "~/trpc/react";
import { find } from "lodash";

type Props = {
  chatId: string;
};

export function useChatSubscriber({ chatId }: Props) {
  const ctx = api.useUtils();

  const handleNewMessage = (message: UCMessage) => {
    const currentMessages = ctx.message.getManyUserToUser.getData({
      chatId: message.chatId,
    });
    if (!currentMessages) return;

    const isMessageInCache = find(currentMessages, { id: message.id });
    if (isMessageInCache) return;

    const updatedMessages = [...currentMessages, message];
    ctx.message.getManyUserToUser.setData(
      { chatId: message.chatId },
      updatedMessages,
    );
  };

  const handleSeenMessage = (message: UCMessage) => {
    const currentMessages = ctx.message.getManyUserToUser.getData({
      chatId: message.chatId,
    });
    if (!currentMessages) return;

    const isMessageInCache = find(currentMessages, { id: message.id });
    if (isMessageInCache) return;

    const updatedMessages = [...currentMessages, message];
    ctx.message.getManyUserToUser.setData(
      { chatId: message.chatId },
      updatedMessages,
    );
  };

  useEffect(() => {
    pusherClient.subscribe(chatId);
    pusherClient.bind("messages:new", handleNewMessage);
    pusherClient.bind("message:seen", handleSeenMessage);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("messages:new", handleNewMessage);
      pusherClient.unbind("message:seen", handleSeenMessage);
    };
  }, []);
}
