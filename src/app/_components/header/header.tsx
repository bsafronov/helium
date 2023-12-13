import { ThemeSwitcher } from "~/components/theme-switcher";
import { getServerAuthSession } from "~/server/auth";
import { UserButton } from "./user-button";

export async function Header() {
  const session = await getServerAuthSession();

  const hasSession = !!session;

  return (
    <header className="flex h-16 w-full items-center justify-end gap-2 border-b px-4">
      <ThemeSwitcher />
      {hasSession && <UserButton userImage={session.user.image} />}
    </header>
  );
}
