import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useDebounce } from "usehooks-ts";
import { useAuth } from "~/hooks/use-auth";

type Props = {
  chatId: string;
};

export function useMessagesSeen({ chatId }: Props) {
  const { mutate: createSeen } = api.message.createSeen.useMutation();

  const currentUserId = useAuth()?.id;
  const [seenIDs, setSeenIDs] = useState<Record<string, boolean>>({});
  const debouncedSeenIDs = useDebounce(seenIDs, 1000);

  const updateSeen = (id: string) => {
    const hasId = seenIDs[id];

    if (hasId) return;

    const updatedSeen = { ...seenIDs, [id]: true };

    setSeenIDs(updatedSeen);
  };

  useEffect(() => {
    if (!currentUserId) return;

    const idsLength = Object.keys(debouncedSeenIDs).length;
    if (idsLength === 0) return;

    console.log("debouncedSeenIDs", debouncedSeenIDs);

    createSeen({ messageIDs: Object.keys(debouncedSeenIDs), chatId });
    setSeenIDs({});
  }, [debouncedSeenIDs]);

  return { seenIDs, updateSeen };
}
