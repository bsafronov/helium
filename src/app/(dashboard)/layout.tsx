import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { Navbar } from "./_components/navbar";

type Props = {
  children?: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth");
  }

  return (
    <>
      <div className="container flex border-x">
        <Navbar />
        <main className="grow">{children}</main>
      </div>
    </>
  );
}
