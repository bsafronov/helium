import { ShoppingCart, UsersRound } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { MyGroupList } from "./my-group-list";
import { UserButton } from "./user-button";

export async function Menu() {
  const session = await getServerAuthSession();

  const hasSession = !!session;

  return (
    <div className="flex h-screen w-full max-w-[16rem] flex-col border-r">
      <div className="border-b p-4">
        {hasSession && <UserButton user={session.user} />}
        {!hasSession && (
          <Button className="w-full" asChild>
            <Link href={"/auth"}>Войти</Link>
          </Button>
        )}
      </div>

      <div className="border-b p-4 text-sm">
        <Link
          href={"/groups"}
          className="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-2 py-2"
        >
          <UsersRound className="h-4 w-4" />
          Группы
        </Link>
        <Link
          href={"/market"}
          className="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-2 py-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Торговая площадка
        </Link>
      </div>

      {hasSession && <MyGroupList />}
      {hasSession && (
        <div className="border-b p-4">
          <Button asChild className="w-full" variant={"secondary"}>
            <Link href={"/groups/new"}>Создать группу</Link>
          </Button>
        </div>
      )}

      <div className="mt-auto flex justify-end p-4">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
