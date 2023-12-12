import { Breadcrumbs } from "~/components/breadcrumbs";
import { MAIN } from "~/consts/routes";

export default async function Page() {
  return (
    <>
      <Breadcrumbs items={[MAIN]} />
    </>
  );
}
