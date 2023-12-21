"use client";

import { useEffect } from "react";
import { useAuthProtected } from "~/features/auth";
import { pusherClient } from "..";
import { useSubscribeChatNew } from "../hooks/use-subscribe-chat-new";
import { useSubscribeChatUpdate } from "../hooks/use-subscribe-chat-update";
import { useSubscribeChatRemove } from "../hooks/use-subscribe-chat-remove";

export function UserSubscriptionProvider() {
  const userId = useAuthProtected().id;
  const handleNewChat = useSubscribeChatNew();
  const handleUpdateChat = useSubscribeChatUpdate();
  const handleRemoveChat = useSubscribeChatRemove();

  useEffect(() => {
    pusherClient.subscribe(userId);
    pusherClient.bind("chat:new", handleNewChat);
    pusherClient.bind("chat:update", handleUpdateChat);
    pusherClient.bind("chat:delete", handleRemoveChat);

    return () => {
      pusherClient.unsubscribe(userId);
      pusherClient.unbind("chat:new", handleNewChat);
      pusherClient.unbind("chat:update", handleUpdateChat);
      pusherClient.unbind("chat:delete", handleRemoveChat);
    };
  }, [userId]);

  return null;
}
