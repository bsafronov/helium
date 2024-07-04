import ThemeSwitcher from "@/components/ui/theme-switcher";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

type Props = {
  children?: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const { session } = await validateRequest();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <div className="fixed top-0 z-50">
        <ThemeSwitcher />
      </div>
      <div className="min-h-screen flex justify-center items-center">
        {children}
      </div>
    </>
  );
}
