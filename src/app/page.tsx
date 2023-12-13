import { Smile } from "lucide-react";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth");
  }

  const username = session.user.username;

  const user = (await api.user.getProfile.query({ username }))!;

  return (
    <>
      <div className="p-4">
        <Avatar className="mx-auto h-64 w-64">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>
            <Smile className="h-48 w-48 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex justify-center p-4 text-muted-foreground">
        {user.name}
      </div>
    </>
  );
}
