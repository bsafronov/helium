"use client";

import { useChatSubscriber } from "./use-chat-subscriber";

type Props = {
  chatId: string;
};
export function ChatSubscriptionProvider({ chatId }: Props) {
  useChatSubscriber({ chatId });

  return null;
}
