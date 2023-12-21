import { GeneralSubscriptionProvider } from "~/providers/user-status.provider";
import { Navbar } from "./_components/navbar";
import { auth } from "~/features/auth";

type Props = {
  children?: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  await auth();

  return (
    <>
      <div className="container flex border-x">
        <GeneralSubscriptionProvider />
        <Navbar />
        <main className="grow">{children}</main>
      </div>
    </>
  );
}
