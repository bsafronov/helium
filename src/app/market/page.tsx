import { ShoppingCart } from "lucide-react";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Heading } from "~/components/heading";
import { MAIN, MARKET } from "~/consts/routes";

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[MAIN, MARKET]} />
      <Heading
        title="Торговая площадка"
        subtitle="Здесь можно найти и добавить модули в свою группу"
        icon={ShoppingCart}
      />
    </>
  );
}
