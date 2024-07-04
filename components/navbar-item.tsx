"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  children?: React.ReactNode;
};

export const NavbarItem = ({ href, label, children }: Props) => {
  const pathname = usePathname();
  const isSelected = pathname === href || pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-2 text-sm rounded-md hover:bg-muted px-2 py-0.5"
      )}
    >
      {isSelected && (
        <div className="absolute left-0 w-1 rounded-full top-0 bottom-0 bg-orange-200" />
      )}
      {children}
      {label}
    </Link>
  );
};
