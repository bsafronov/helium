import Link from "next/link";
import { Avatar } from "~/components/avatar";
import { auth } from "~/lib/next-auth/server";

export async function UserAvatar() {
  const { image, name, id } = await auth();
  return (
    <div className="flex items-center gap-1">
      <Link href={`/u/${id}`}>
        <Avatar image={image} size="sm" />
      </Link>
      <span className="text-xs text-muted-foreground">{name}</span>
    </div>
  );
}
