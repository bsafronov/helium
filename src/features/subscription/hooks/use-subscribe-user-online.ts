"use client";

import { useEffect, useState } from "react";
import type { Channel, Members } from "pusher-js";
import { pusherClient } from "~/lib/pusher";
import { useUserOnlineList } from "~/features/user/store/use-user-online-list.store";

export const useSubscribeUserOnline = () => {
  const { add, set, remove } = useUserOnlineList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, unknown>) =>
        // @ts-expect-error No member id
        initialMembers.push(member.id),
      );
      set(initialMembers);
    });

    channel.bind("pusher:member_added", (member: Record<string, unknown>) => {
      // @ts-expect-error No member id
      add(member.id);
    });

    channel.bind("pusher:member_removed", (member: Record<string, unknown>) => {
      // @ts-expect-error No member id
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-messenger");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove]);
};
