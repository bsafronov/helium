"use client";

import { format } from "date-fns";
import { useMemo } from "react";
import { type UCMessage } from "../_types";
import { api } from "~/trpc/react";

type Props = {
  chatId: string;
};

export function useMessagesGroupByDate({ chatId }: Props) {
  const ctx = api.useUtils();
  const messages = ctx.message.getManyUserToUser.getData({ chatId });

  const sortedMessages = useMemo(() => {
    if (!messages) return;

    const messagesByDate: Record<string, UCMessage[]> = {};
    messages.forEach((message) => {
      const day = format(new Date(message.createdAt), "yyyy-MM-dd");
      const hasRecords = day in messagesByDate;

      if (hasRecords) {
        messagesByDate[day]?.push(message);
      } else {
        messagesByDate[day] = [message];
      }
    });

    return messagesByDate;
  }, [messages]);

  return sortedMessages;
}
