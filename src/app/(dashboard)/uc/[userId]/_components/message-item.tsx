import { format } from "date-fns";
import { CheckCheck } from "lucide-react";
import { type Auth } from "~/lib/auth";
import { cn } from "~/lib/utils";
import { type RouterOutputs } from "~/trpc/shared";
import { motion } from "framer-motion";

type Props = {
  message: RouterOutputs["message"]["getManyUserToUser"][number];
  currentUser: Auth;
  prevMessageSenderId?: string;
  nextMessageSenderId?: string;
};

export function MessageItem({
  message,
  currentUser,
  prevMessageSenderId,
  nextMessageSenderId,
}: Props) {
  const prevSameSender = prevMessageSenderId === message.userId;
  const nextSameSender = nextMessageSenderId === message.userId;
  const isOwn = message.userId === currentUser.id;
  const isSeen =
    message.seenByIDs.filter((id) => id !== currentUser.id).length > 0;

  return (
    <motion.li
      viewport={{ once: true }}
      onViewportEnter={() => console.log(message.content)}
      className={cn(
        "mt-2 flex",
        isOwn && "justify-end",
        prevSameSender && "mt-[1px]",
      )}
    >
      <div
        className={cn(
          "flex max-w-sm flex-wrap items-end rounded-xl bg-muted/90 p-2",
          isOwn && "bg-primary/90 text-primary-foreground",
          prevSameSender && isOwn && "rounded-tr-sm",
          nextSameSender && isOwn && "rounded-br-sm",
          prevSameSender && !isOwn && "rounded-tl-sm",
          nextSameSender && !isOwn && "rounded-bl-sm",
        )}
      >
        <p className="text-sm">{message.content}</p>
        <div className="relative ml-auto inline-block flex items-center justify-end gap-2 self-end pl-4 text-xs text-muted-foreground">
          {/* {hasChanges && <span>изменено </span>} */}
          {format(new Date(message.createdAt), "HH:mm")}
          {isOwn && (
            <CheckCheck
              className={cn("inline-block h-4 w-4", {
                "text-sky-500": isSeen,
              })}
            />
          )}
        </div>
      </div>
    </motion.li>
  );
}
