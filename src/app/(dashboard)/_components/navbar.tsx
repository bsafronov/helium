import { UserRound } from "lucide-react";
import { Navlink } from "~/components/navlink";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { LogoutButton } from "./logout-button";
import { ChatList } from "./chat-list";

export function Navbar() {
  return (
    <div className="min-w-[16rem] max-w-[16rem] border-r">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <span className="text-3xl font-extrabold">Helium</span>
        <div className="flex gap-2">
          <ThemeSwitcher />
          <LogoutButton />
        </div>
      </div>
      <div className="border-b">
        <Navlink icon={UserRound} href="/" label="Мой профиль" />
      </div>
      <ChatList />

      {/* <div className="border-b">
        <div className="border-b bg-muted/50 px-4 text-sm text-muted-foreground">
          Чаты
        </div>
      </div> */}
      <div className="border-b">
        <div className="border-b bg-muted/50 px-4 text-sm text-muted-foreground">
          Сообщество
        </div>
        <Navlink icon={UserRound} href="/people" label="Люди" />
      </div>
    </div>
  );
}
