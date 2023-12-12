import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Route } from "~/consts/routes";
import { cn } from "~/lib/utils";

type Props = {
  items: Route[];
};

export function Breadcrumbs({ items }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b px-4 py-2 text-sm">
      {items.map((item, index) => (
        <div className="flex items-center gap-1" key={item.href}>
          {index !== 0 && <ChevronRight className="h-4 w-4" />}
          <Link
            href={item.href}
            className={cn(
              items.length - 1 !== index && "text-muted-foreground",
            )}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
