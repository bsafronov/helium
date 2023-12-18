import Link from "next/link";
import { Avatar } from "~/components/avatar";
import { type RouterOutputs } from "~/trpc/shared";

type Props = {
  chat: RouterOutputs["chat"]["getManyThisUser"]["chats"][number];
  currentUserId: string;
};

export function ChatItem({ chat, currentUserId }: Props) {
  const otherUserId =
    currentUserId === chat.firstUserId ? chat.secondUserId : chat.firstUserId;

  const title = () => {
    switch (chat.type) {
      case "ONE_TO_ONE":
        return chat.users.filter((user) => user.id !== currentUserId)[0]?.name;
      case "CHANNEL":
      case "GROUP":
        return chat.title;
    }
  };

  const avatar = () => {
    switch (chat.type) {
      case "ONE_TO_ONE":
        return chat.users.filter((user) => user.id !== currentUserId)[0]?.image;
      case "CHANNEL":
      case "GROUP":
        return null;
    }
  };

  const link = () => {
    switch (chat.type) {
      case "ONE_TO_ONE":
        return `/uc/${otherUserId}`;
      case "GROUP":
        return `/gc/${chat.id}`;
      case "CHANNEL":
        return `/cc/${chat.id}`;
    }
  };

  return (
    <li>
      <Link href={link()} className="flex px-2 py-2 hover:bg-emerald-500/20">
        <Avatar image={avatar()} size="sm" />
        <div className="ml-2 flex flex-col text-xs">
          <span>{title()}</span>
          <span className="text-muted-foreground">Последнее сообщение</span>
        </div>
      </Link>
    </li>
  );
}
