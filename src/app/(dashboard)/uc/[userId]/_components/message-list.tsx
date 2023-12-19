"use client";

import { format } from "date-fns";
import { useMemo } from "react";
import { LoaderScreen } from "~/components/loader-screen";
import { ScrollArea } from "~/components/ui/scroll-area";
import { type Auth } from "~/lib/auth";
import { formatChatDate } from "~/lib/date";
import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";
import { MessageItem } from "./message-item";

type Props = {
  chatId: string;
  currentUser: Auth;
};

type Message = RouterOutputs["message"]["getManyUserToUser"][number];

export function MessageList({ chatId, currentUser }: Props) {
  const { data: messages } = api.message.getManyUserToUser.useQuery({ chatId });

  const sortedMessages = useMemo(() => {
    if (!messages) return null;

    const messagesByDate: Record<string, Message[]> = {};

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

  if (!sortedMessages) {
    return <LoaderScreen />;
  }

  return (
    <div className="relative flex grow flex-col justify-end overflow-hidden bg-gradient-to-br from-emerald-200 to-amber-200 dark:from-emerald-900 dark:to-amber-900">
      <div
        className="absolute inset-0 fill-emerald-700"
        style={{
          backgroundImage: `url(/i-like-food.svg)`,
        }}
      />
      <ScrollArea className="h-max">
        <div className="relative z-10 mt-2 flex grow flex-col self-end">
          {Object.entries(sortedMessages).map(([day, messages]) => (
            <div key={day}>
              <div className="relative flex justify-center px-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-background/20" />
                </div>
                <span className="relative block rounded-md bg-background/70 px-2 text-sm text-muted-foreground">
                  {formatChatDate(day)}
                </span>
              </div>

              <ul className="flex grow flex-col p-4">
                {messages.map((message, index) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    currentUser={currentUser}
                    prevMessageSenderId={messages[index - 1]?.userId}
                    nextMessageSenderId={messages[index + 1]?.userId}
                  />
                ))}
              </ul>
              {/* <AlwaysScrollToBottom items={messages} /> */}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

// type ScrollProps = {
//   items: unknown;
// };
// const AlwaysScrollToBottom = ({ items }: ScrollProps) => {
//   const elementRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => elementRef.current?.scrollIntoView(), [items]);
//   return <div ref={elementRef} />;
// };
