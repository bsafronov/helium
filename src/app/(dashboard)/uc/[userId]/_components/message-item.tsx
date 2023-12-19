import { format } from "date-fns";
import { type Auth } from "~/lib/auth";
import { cn } from "~/lib/utils";
import { type RouterOutputs } from "~/trpc/shared";

type Props = {
  message: RouterOutputs["message"]["getManyUserToUser"][number];
  currentUser: Auth;
};

export function MessageItem({ message, currentUser }: Props) {
  const hasChanges =
    message.createdAt.toISOString() !== message.updatedAt.toISOString();
  return (
    <li
      className={cn("flex", {
        "justify-end": message.userId === currentUser.id,
      })}
    >
      <div
        className={cn(
          "flex max-w-sm flex-wrap items-end rounded-lg bg-muted p-2",
          {
            "bg-primary text-primary-foreground":
              message.userId === currentUser.id,
          },
        )}
      >
        <p className="text-sm">{message.content}</p>
        <span className="relative ml-auto inline-block justify-end self-end pl-4 text-xs text-muted-foreground">
          {hasChanges && <span>изменено </span>}
          {format(new Date(message.createdAt), "HH:mm")}
        </span>
      </div>
    </li>
  );
}
