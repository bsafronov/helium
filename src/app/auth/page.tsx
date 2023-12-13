import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginButtonList } from "./_components/login-button-list";

export default async function Page() {
  const session = await getServerSession();

  if (session) {
    return redirect("/");
  }

  return (
    <>
      <div className="p-4">
        <LoginButtonList />
      </div>
    </>
  );
}
