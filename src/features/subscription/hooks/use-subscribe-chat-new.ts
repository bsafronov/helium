"use client";

import { type NavChat } from "~/features/chat";
import { api } from "~/trpc/react";

type FnProps = {
  chat: NavChat;
};

export function useSubscribeChatNew() {
  const ctx = api.useUtils();

  const handleNewChat = ({ chat }: FnProps) => {
    const chats = ctx.chat.getManyThisUser.getData()?.chats;

    ctx.chat.getManyThisUser.setData(undefined, {
      chats: [chat, ...chats!],
    });
  };

  return handleNewChat;
}
