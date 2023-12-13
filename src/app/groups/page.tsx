import { UsersRound } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Heading } from "~/components/heading";
import { buttonVariants } from "~/components/ui/button";
import { GROUPS, MAIN, MY_GROUPS } from "~/consts/routes";

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[MAIN, GROUPS]} />
      <Heading
        title="Группы"
        subtitle="Здесь находятся публичные группы"
        icon={UsersRound}
      />
      <div className="p-4">
        <Link
          href={MY_GROUPS.href}
          className={buttonVariants({ variant: "outline" })}
        >
          Мои группы
        </Link>
      </div>
    </>
  );
}
