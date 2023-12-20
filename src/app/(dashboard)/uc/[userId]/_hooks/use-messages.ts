"use client";

import { api } from "~/trpc/react";
import { useChatSubscriber } from "./use-chat-subscriber";

import { useMessagesGroupByDate } from "./use-messages-group-by-date";
import { useScroller } from "./use-scroller";

type Props = {
  chatId: string;
  bottomRef: React.RefObject<HTMLDivElement | null>;
};

export function useMessages({ chatId, bottomRef }: Props) {
  const { data: messages } = api.message.getManyUserToUser.useQuery({
    chatId,
  });
  const sortedMessages = useMessagesGroupByDate({ chatId });

  useScroller({ bottomRef, messages });
  useChatSubscriber({ chatId });

  return sortedMessages;
}
