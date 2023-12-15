import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

type Props = {
  children?: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await getServerAuthSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
}
