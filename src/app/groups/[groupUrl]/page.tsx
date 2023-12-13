import { Breadcrumbs } from "~/components/breadcrumbs";
import { MAIN, GROUPS } from "~/consts/routes";

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[MAIN, GROUPS]} />
    </>
  );
}
