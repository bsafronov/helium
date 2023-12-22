import { Navlink } from "~/components/navlink";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { UserAvatar } from "../user/user-avatar";
import { Logout } from "../auth/logout";
import { ChatList } from "../chat/chat-list";

export function Navbar() {
  return (
    <div className="h-screen min-w-[16rem] max-w-[16rem] border-r">
      <div className="flex h-16 items-center justify-between gap-2 border-b px-2">
        <UserAvatar />
        <div className="flex gap-2">
          <ThemeSwitcher />
          <Logout />
        </div>
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
