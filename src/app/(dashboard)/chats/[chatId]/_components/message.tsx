import { format } from "date-fns";
import { Cat } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { type auth } from "~/lib/auth";
import { cn } from "~/lib/utils";
import { type RouterOutputs } from "~/trpc/shared";
import { MessageDelete } from "./message-delete";

type Props = {
  message: RouterOutputs["chat"]["getOne"]["messages"][number];
  currentUser: Awaited<ReturnType<typeof auth>>;
};

export function Message({ message, currentUser }: Props) {
  const hasChanged =
    message.createdAt.toISOString() !== message.updatedAt.toISOString();

  return (
    <li className="flex items-end gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={message.sender.image ?? undefined} />
        <AvatarFallback>
          <Cat className="text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className={cn(
              "rounded-bl-none rounded-br-xl rounded-tl-xl rounded-tr-xl p-2 text-sm",
              {
                "bg-emerald-200/30": currentUser.id === message.sender.id,
              },
            )}
          >
            {/* <span className="mb-2 text-xs font-medium">{message.sender.name}</span> */}

            <div className="min-w-[5rem] max-w-[24rem]">
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div className="flex w-full justify-end">
                <div className="flex gap-1 text-xs text-muted-foreground">
                  {hasChanged && <span>изменено</span>}
                  <span>{format(new Date(message.createdAt), "HH:mm")}</span>
                </div>
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <MessageDelete messageId={message.id} />
        </ContextMenuContent>
      </ContextMenu>
    </li>
  );
}
