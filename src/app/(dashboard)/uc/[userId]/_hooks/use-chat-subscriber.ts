"use client";

import { useEffect } from "react";
import { pusherClient } from "~/lib/pusher";
import { type UCMessage } from "../_types";
import { api } from "~/trpc/react";
import { find } from "lodash";

type Props = {
  chatId: string;
};

type SeenMessagesSubscription = {
  messageIDs: string[];
  userId: string;
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

  const handleSeenMessage = ({
    messageIDs,
    userId,
  }: SeenMessagesSubscription) => {
    const currentMessages = ctx.message.getManyUserToUser.getData({
      chatId,
    });

    if (!currentMessages) return;

    const updatedMessages = currentMessages.map((message) => {
      if (!messageIDs.includes(message.id)) return message;

      return {
        ...message,
        seenByIDs: [...message.seenByIDs, userId],
      };
    });

    ctx.message.getManyUserToUser.setData({ chatId }, updatedMessages);
  };

  const handleTypingMessage = () => {
    console.log("handleTypingMessage");
  };

  useEffect(() => {
    pusherClient.subscribe(chatId);
    pusherClient.bind("messages:new", handleNewMessage);
    pusherClient.bind("messages:seen", handleSeenMessage);
    pusherClient.bind("messages:typing", handleTypingMessage);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("messages:new", handleNewMessage);
      pusherClient.unbind("messages:seen", handleSeenMessage);
      pusherClient.unbind("messages:typing", handleTypingMessage);
    };
  }, []);
}
