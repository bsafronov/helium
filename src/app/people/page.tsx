import { UserRound } from "lucide-react";
import { Heading } from "~/components/heading";

export default function Page() {
  return (
    <>
      <Heading
        title="Люди"
        subtitle="Здесь отображены зарегистрированные пользователи"
        icon={UserRound}
      />
    </>
  );
}
