import { UserRound } from "lucide-react";
import { Heading } from "~/components/heading";

export default function Page() {
  return (
    <>
      <Heading
        title="Мои подписчики"
        subtitle="Здесь отображены мои подписчики"
        icon={UserRound}
      />
    </>
  );
}
