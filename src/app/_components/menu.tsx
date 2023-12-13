import { LogIn, UserRound, UsersRound } from "lucide-react";
import { getServerAuthSession } from "~/server/auth";
import { Navlink } from "../../components/navlink";
import { AUTH } from "~/consts/routes";

export async function Menu() {
  const session = await getServerAuthSession();

  const hasSession = !!session;
  const username = session?.user.username;

  return (
    <div className="flex h-screen w-full max-w-[16rem] flex-col border-r">
      <div className="border-b px-4 py-2">
        <h3 className="text-sm font-bold">Helium</h3>
      </div>
      <div className="border-b">
        {hasSession && (
          <>
            <Navlink
              href={`/${username}`}
              label="Моя страница"
              icon={UserRound}
            />
            <Navlink href="/" label="Друзья" icon={UserRound} />
          </>
        )}
        <Navlink href="/people" label="Люди" icon={UsersRound} />
        <Navlink href="/groups" label="Группы" icon={UsersRound} />
      </div>
      {!hasSession && (
        <Navlink
          href={AUTH.href}
          label="Войти"
          icon={LogIn}
          className="text-blue-600 hover:text-blue-700"
        />
      )}
    </div>
  );
}
