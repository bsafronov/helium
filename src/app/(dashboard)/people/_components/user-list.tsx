import { type RouterOutputs } from "~/trpc/shared";
import { UserItem } from "./user-item";

type Props = {
  users: RouterOutputs["user"]["getManyPublic"];
};

export function UserList({ users }: Props) {
  return (
    <ul className="divide-y border-b">
      {users.map((user) => (
        <UserItem user={user} key={user.id} />
      ))}
    </ul>
  );
}
