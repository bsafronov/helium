"use client";

import { useRef } from "react";
import { LoaderScreen } from "~/components/loader-screen";
import { ScrollArea } from "~/components/ui/scroll-area";
import { type Auth } from "~/lib/auth";
import { formatChatDate } from "~/lib/date";
import { useMessages } from "../_hooks/use-messages";
import { MessageItem } from "./message-item";

type Props = {
  chatId: string;
  currentUser: Auth;
};

export function MessageList({ chatId, currentUser }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const messages = useMessages({ chatId, bottomRef });

  if (!messages) {
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
          {Object.entries(messages).map(([day, messages]) => (
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
            </div>
          ))}
          <div ref={bottomRef} />
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
