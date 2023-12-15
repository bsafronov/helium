import { Cat } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { auth } from "~/lib/auth";

export default async function Page() {
  const { image, name } = await auth();

  return (
    <>
      <div className="flex justify-center gap-4 p-4">
        <Avatar className="h-64 w-64">
          <AvatarImage src={image ?? undefined} />
          <AvatarFallback>
            <Cat className="h-48 w-48 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex justify-center p-4 text-muted-foreground">
        {name}
      </div>
    </>
  );
}
