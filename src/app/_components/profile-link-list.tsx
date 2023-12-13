import { UserRound } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { GROUPS } from "~/consts/routes";
import { cn } from "~/lib/utils";

const profileLinks = [
  {
    href: "/",
    label: "Моя страница",
    icon: UserRound,
  },
  {
    href: GROUPS.href,
    label: "Группы",
    icon: UserRound,
  },
  {
    href: "/",
    label: "Подписки",
    icon: UserRound,
  },
  {
    href: "/",
    label: "Сообщения",
    icon: UserRound,
  },
];

export function ProfileLinkList() {
  return (
    <div className="border-b text-sm">
      {profileLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-full justify-start gap-2 rounded-none font-normal",
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </div>
  );
}
