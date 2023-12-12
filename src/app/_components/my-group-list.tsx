import { ChevronsUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

export function MyGroupList() {
  return (
    <div className="border-b p-4 text-sm">
      <Collapsible>
        <CollapsibleTrigger
          className="flex w-full items-center justify-between"
          asChild
        >
          <Button variant={"ghost"} className="justify-between" size={"sm"}>
            Мои группы <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 px-2"></CollapsibleContent>
      </Collapsible>
    </div>
  );
}
