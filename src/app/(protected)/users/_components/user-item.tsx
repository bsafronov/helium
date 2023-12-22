import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { Avatar } from "~/components/avatar";
import { buttonVariants } from "~/components/ui/button";
import { type RouterOutputs } from "~/trpc/shared";

type Props = {
  user: RouterOutputs["user"]["getManyPublicUsers"][number];
};

export function UserItem({ user }: Props) {
  return (
    <li className="flex p-4">
      <Link href={`/u/${user.id}`}>
        <Avatar image={user.image} />
      </Link>
      <div className="ml-2 flex-col">
        <span className="text-sm">{user.name}</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Link
          href={`/c/u/${user.id}`}
          className={buttonVariants({ size: "icon", variant: "ghost" })}
        >
          <MessageSquare className="text-muted-foreground" />
        </Link>
      </div>
    </li>
  );
}
