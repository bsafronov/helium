import { UserRound } from "lucide-react";
import { Heading } from "~/components/heading";

export default function Page() {
  return (
    <>
      <Heading
        title="Мои подписки"
        subtitle="Здесь отображены мои подписки"
        icon={UserRound}
      />
    </>
  );
}
