import { UserRound } from "lucide-react";
import { Navlink } from "~/components/navlink";

export function Navbar() {
  return (
    <div className="h-screen min-w-[16rem] max-w-[16rem] border-r">
      <div className="flex h-16 items-center border-b px-4">
        <span className="text-3xl font-bold">Helium</span>
      </div>
      <div className="border-b">
        <div className="flex border-b border-b bg-muted/50 px-4 py-1 text-sm text-muted-foreground">
          Пользователь
        </div>
        <Navlink href="/profile" label="Моя страница" icon={UserRound} />
        <Navlink
          href="/profile/followers"
          label="Мои подписчики"
          icon={UserRound}
        />
        <Navlink
          href="/profile/subscriptions"
          label="Мои подписки"
          icon={UserRound}
        />
        <Navlink href="/profile/groups" label="Мои группы" icon={UserRound} />
        <Navlink
          href="/profile/messages"
          label="Мои сообщения"
          icon={UserRound}
        />
      </div>
      <div className="bo">
        <div className="flex border-b bg-muted/50 px-4 py-1 text-sm text-muted-foreground">
          Сообщество
        </div>
        <Navlink href="/people" label="Люди" icon={UserRound} />
        <Navlink href="/groups" label="Группы" icon={UserRound} />
      </div>
    </div>
  );
}
