import { api } from "~/trpc/server";
import { UserItem } from "./user-item";
import { NoMatch } from "~/components/no-match";

export async function UserList() {
  const users = await api.user.getManyPublicUsers.query({});

  if (users.length === 0) {
    return <NoMatch description="Пользователи не найдены" />;
  }

  return (
    <ul className="divide-y border-b">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}
