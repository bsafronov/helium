import { Breadcrumbs } from "~/components/breadcrumbs";
import { MAIN, PROFILE } from "~/consts/routes";

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[MAIN, PROFILE]} />
    </>
  );
}
