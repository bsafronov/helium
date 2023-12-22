import { Navbar } from "./_modules/navbar/navbar";
import { auth } from "~/lib/next-auth/server";
import { AuthProtectedProvider } from "~/lib/next-auth/provider";
import { UserSubscriptionProvider } from "./_modules/subscription/user-subscription-provider";

type Props = {
  children?: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  await auth();

  return (
    <AuthProtectedProvider>
      <UserSubscriptionProvider />
      <div className="container flex border-x">
        <Navbar />
        <main className="grow">{children}</main>
      </div>
    </AuthProtectedProvider>
  );
}
