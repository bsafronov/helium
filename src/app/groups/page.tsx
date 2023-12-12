import { UsersRound } from "lucide-react";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Heading } from "~/components/heading";
import { GROUPS, MAIN } from "~/consts/routes";

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[MAIN, GROUPS]} />
      <Heading
        title="Группы"
        subtitle="Здесь находятся публичные группы"
        icon={UsersRound}
      />
    </>
  );
}
