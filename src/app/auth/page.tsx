import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginButtonList } from "./_components/login-button-list";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { AUTH, MAIN } from "~/consts/routes";

export default async function Page() {
  const session = await getServerSession();

  if (session) {
    return redirect("/");
  }

  return (
    <>
      <Breadcrumbs items={[MAIN, AUTH]} />
      <div className="p-4">
        <LoginButtonList />
      </div>
    </>
  );
}
