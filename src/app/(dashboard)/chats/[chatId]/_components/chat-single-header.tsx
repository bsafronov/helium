import { Cat } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { auth } from "~/lib/auth";
import { type RouterOutputs } from "~/trpc/shared";

type Props = {
  users: RouterOutputs["chat"]["getOne"]["users"];
};

export async function ChatSingleHeader({ users }: Props) {
  const sessionUser = await auth();
  const otherUser = users.filter((user) => user.id !== sessionUser.id)[0];

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={otherUser?.image ?? undefined} />
        <AvatarFallback>
          <Cat className="text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <h1 className="flex flex-col text-sm">
        <Link href={`/people/${otherUser?.username}`}>{otherUser?.name}</Link>
        <span className="text-xs text-muted-foreground">В сети</span>
      </h1>
    </div>
  );
}
