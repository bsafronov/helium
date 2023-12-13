import { UserRound } from "lucide-react";
import { Heading } from "~/components/heading";

export default function Page() {
  return (
    <>
      <Heading
        title="Мои сообщения"
        subtitle="Здесь отображены мои сообщения"
        icon={UserRound}
      />
    </>
  );
}
