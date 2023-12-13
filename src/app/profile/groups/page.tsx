import { UserRound } from "lucide-react";
import { Heading } from "~/components/heading";

export default function Page() {
  return (
    <>
      <Heading
        title="Мои группы"
        subtitle="Здесь отображены мои группы"
        icon={UserRound}
      />
    </>
  );
}
