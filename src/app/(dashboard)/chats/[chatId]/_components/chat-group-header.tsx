import { type RouterOutputs } from "~/trpc/shared";

type Props = {
  users: RouterOutputs["chat"]["getOne"]["users"];
};

export function ChatGroupHeader({ users }: Props) {
  return (
    <div className="flex items-center gap-2">
      {/* <Avatar>
      <AvatarImage />
    </Avatar> */}
    </div>
  );
}
