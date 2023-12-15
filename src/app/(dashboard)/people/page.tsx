import { api } from "~/trpc/server";
import { UserList } from "./_components/user-list";

export default async function Page() {
  const users = await api.user.getManyPublic.query();

  return (
    <>
      <div className="flex h-16 items-center border-b px-4">
        <h1 className="text-3xl font-bold">Люди</h1>
      </div>

      <UserList users={users} />
    </>
  );
}
