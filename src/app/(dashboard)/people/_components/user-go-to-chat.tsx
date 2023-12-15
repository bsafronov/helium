"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

type Props = {
  userId: string;
};

export function UserGoToChat({ userId }: Props) {
  const router = useRouter();
  const { mutateAsync: goToChat } = api.chat.goToChatWithUser.useMutation({
    onSuccess: (chat) => {
      router.push(`/chats/${chat.id}`);
      router.refresh();
    },
  });

  return <Button onClick={() => goToChat({ userId })}>Написать</Button>;
}
