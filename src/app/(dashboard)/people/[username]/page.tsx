import { Cat } from "lucide-react";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/server";
import { UserGoToChat } from "../_components/user-go-to-chat";

type Props = {
  params: {
    username: string;
  };
};

export default async function Page({ params: { username } }: Props) {
  const user = await api.user.getProfile.query({ username });

  if (!user) {
    return notFound();
  }

  const { image, name, id } = user;

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
      <div className="flex justify-center p-4">
        <UserGoToChat userId={id} />
      </div>
    </>
  );
}
