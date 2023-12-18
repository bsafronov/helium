import { PageHeader } from "~/components/page-header";
import { UserList } from "./_components/user-list";

export default async function Page() {
  return (
    <>
      <PageHeader>
        <h1 className="text-xl font-bold">Пользователи</h1>
      </PageHeader>
      <UserList />
    </>
  );
}
