import { Navlink } from "~/components/navlink";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Logout } from "./logout";
import { ChatList } from "./chat-list";

export function Navbar() {
  return (
    <div className="h-screen min-w-[16rem] max-w-[16rem] border-r">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <ThemeSwitcher />
        <Logout />
      </div>
      <ChatList />
      <div className="border-b">
        <div className="border-b bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
          Сообщество
        </div>
        <Navlink href="/users" label="Пользователи" />
      </div>
    </div>
  );
}
