"use client";

import { useActiveList } from "~/app/(protected)/_modules/user/use-active-list";

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
