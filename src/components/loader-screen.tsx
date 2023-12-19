import { Loader2 } from "lucide-react";

export function LoaderScreen() {
  return (
    <div className="flex grow items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
    </div>
  );
}
