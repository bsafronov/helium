import { Breadcrumbs } from "~/components/breadcrumbs";
import { DASHBOARD, MAIN, MY_GROUPS } from "~/consts/routes";

export default async function Page() {
  return (
    <>
      <Breadcrumbs items={[MAIN, DASHBOARD, MY_GROUPS]} />
    </>
  );
}
