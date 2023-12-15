"use client";

import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { ContextMenuItem } from "~/components/ui/context-menu";
import { api } from "~/trpc/react";

type Props = {
  messageId: string;
};

export function MessageDelete({ messageId }: Props) {
  const router = useRouter();
  const { mutate } = api.message.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <ContextMenuItem
      className="text-red-500 focus:text-red-500"
      onClick={() => mutate({ messageId })}
    >
      <FaTrash />
      Удалить
    </ContextMenuItem>
  );
}
