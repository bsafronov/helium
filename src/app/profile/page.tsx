import { Cat } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getCurrentSession } from "~/lib/get-current-session";

export default async function Page() {
  const {
    user: { name, image },
  } = await getCurrentSession();

  return (
    <>
      <div className="p-4">
        <Avatar className="mx-auto h-64 w-64">
          <AvatarImage src={image ?? ""} />
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
