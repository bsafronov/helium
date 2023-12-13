import { ChevronsUpDown, LayoutDashboard, UsersRound } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { DASHBOARD } from "~/consts/routes";
import { cn } from "~/lib/utils";

export function MyGroupList() {
  return (
    <div className="border-b text-sm">
      <Link
        href={DASHBOARD.href}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "w-full justify-start gap-2 rounded-none font-normal",
        )}
      >
        <LayoutDashboard className="h-4 w-4" />
        Панель управления
      </Link>
      <Collapsible>
        <CollapsibleTrigger
          className="flex w-full items-center justify-between"
          asChild
        >
          <Button
            variant={"ghost"}
            className="justify-between rounded-none font-normal"
            size={"sm"}
          >
            <div className="flex items-center gap-2">
              <UsersRound className="h-4 w-4" />
              Мои группы
            </div>{" "}
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 px-2"></CollapsibleContent>
      </Collapsible>
    </div>
  );
}
