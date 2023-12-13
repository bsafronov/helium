import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Heading } from "~/components/heading";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DASHBOARD, MAIN, MY_GROUPS } from "~/consts/routes";

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[MAIN, DASHBOARD]} />
      <Heading
        title="Панель управления"
        subtitle="Здесь что-то находится"
        icon={LayoutDashboard}
      />
      <div className="p-4">
        <Link href={MY_GROUPS.href}>
          <Card>
            <CardHeader>
              <CardTitle>Мои группы</CardTitle>
              <CardDescription>
                В которых я участвую или администрирую
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </>
  );
}
