import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Props = {
  href: string;
  label: string;
  icon: LucideIcon;
  className?: string;
};

export function Navlink({ href, icon: Icon, label, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "w-full justify-start gap-2 rounded-none font-normal",
        className,
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
