import { validateRequest } from "@/lib/validate-request";
import Link from "next/link";
import { SignOutButton } from "./sign-out-button";
import { Container } from "./ui/container";
import ThemeSwitcher from "./ui/theme-switcher";

export const Header = async () => {
  const { session } = await validateRequest();

  return (
    <div className="sticky top-0 h-16 flex items-center border-b bg-background mb-8 z-50">
      <Container className="flex justify-end">
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {session ? (
            <SignOutButton />
          ) : (
            <Link href="/auth/sign-in">Войти</Link>
          )}
        </div>
      </Container>
    </div>
  );
};
