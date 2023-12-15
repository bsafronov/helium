import { Loader2 } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex h-full flex-col">
        <header className="flex h-16 items-center border-b px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-1 text-sm">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </header>
        <div className="flex grow items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-muted" />
        </div>

        <div className="border-t px-4 pb-2.5 pt-2 text-sm text-muted-foreground">
          Ждём ответ от сервера...
        </div>
      </div>
    </>
  );
}
