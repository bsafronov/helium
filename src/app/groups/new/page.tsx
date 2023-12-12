import { ShoppingCart } from "lucide-react";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Heading } from "~/components/heading";
import { GROUPS, MAIN, NEW_GROUP } from "~/consts/routes";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <>
      <Breadcrumbs items={[MAIN, GROUPS, NEW_GROUP]} />
      <Heading
        title="Новая группа"
        subtitle="Создайте свою группу, добавьте в неё пользователей и обменивайтесь информацией!"
        icon={ShoppingCart}
      />
    </>
  );
}
