import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getUserPosts } from "@/actions/get-user-posts";
import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
type Props = {
  createdAt: Date;
  user: Awaited<ReturnType<typeof getUserPosts>>[number]["user"];
};

export const PostHeader = ({ createdAt, user }: Props) => {
  const getDisplayName = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }

    return user.username;
  };

  const getInitials = () => {
    const name = getDisplayName().split(" ");

    if (name.length > 1) {
      return `${name[0][0] + name[1][0]}`.toUpperCase();
    }

    return `${name[0][0] + name[0][1]}`.toUpperCase();
  };

  return (
    <div className="p-6 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Avatar className="size-12">
          <AvatarImage src={user.avatar?.url} />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-sm">
          <span className="font-semibold">{getDisplayName()}</span>
          <span className="text-muted-foreground text-xs">
            {formatRelative(createdAt, new Date(), {
              locale: ru,
            })}
          </span>
        </div>
      </div>
      <button className="text-muted-foreground">
        <MoreHorizontal />
      </button>
    </div>
  );
};
