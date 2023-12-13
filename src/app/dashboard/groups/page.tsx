import { UsersRound } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Heading } from "~/components/heading";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DASHBOARD, GROUPS, MAIN, MY_GROUPS, NEW_GROUP } from "~/consts/routes";
import { cn } from "~/lib/utils";

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[MAIN, DASHBOARD, MY_GROUPS]} />
      <Heading
        title="Мои группы"
        subtitle="Группы, в которых я участвую или администрирую"
        icon={UsersRound}
      />
      <div className="p-4">
        <Link href={NEW_GROUP.href}>
          <Card className="border-dashed">
            <CardHeader className="text-center">
              <CardTitle>Новая группа</CardTitle>
              <CardDescription>Создать новую группу</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <div className="p-4 ">
        <h3 className="flex flex-col items-center justify-center text-muted-foreground">
          У меня пока нет групп
          <Link
            href={GROUPS.href}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Искать на площадке
          </Link>
        </h3>
      </div>
    </>
  );
}
