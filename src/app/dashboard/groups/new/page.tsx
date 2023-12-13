import { ShoppingCart } from "lucide-react";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Heading } from "~/components/heading";
import { DASHBOARD, MY_GROUPS, MAIN, NEW_GROUP } from "~/consts/routes";
import { GroupCreateForm } from "./_components/group-create-form";

export default async function Page() {
  return (
    <>
      <Breadcrumbs items={[MAIN, DASHBOARD, MY_GROUPS, NEW_GROUP]} />
      <Heading
        title="Новая группа"
        subtitle="Создайте свою группу, добавьте в неё пользователей и обменивайтесь информацией!"
        icon={ShoppingCart}
      />
      <GroupCreateForm />
    </>
  );
}
