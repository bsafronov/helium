"use client";

import { useActiveList } from "~/hooks/subscriptions/use-active-list";

type Props = {
  userId: string;
};

export function UserStatus({ userId }: Props) {
  const online = useActiveList().isOnline(userId);
  return (
    <span className="text-xs text-muted-foreground">
      {online ? "В сети" : "Не в сети"}
    </span>
  );
}
