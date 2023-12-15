import { Cat } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { auth } from "~/lib/auth";
import { type RouterOutputs } from "~/trpc/shared";

type Props = {
  user: RouterOutputs["user"]["getManyPublic"][number];
};

export async function UserItem({ user }: Props) {
  const currentUser = await auth();
  const { image, name, username, id } = user;

  if (currentUser.id === id) {
    return null;
  }

  return (
    <li>
      <Link
        href={`/people/${username}`}
        className="group flex items-center justify-between gap-4 p-4 hover:bg-muted"
      >
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={image ?? undefined} />
            <AvatarFallback>
              <Cat className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">{name}</span>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100"></div>
      </Link>
    </li>
  );
}
