import { getUserProfile } from "@/actions/get-user-profile";
import { formatDisplayName, formatRelativeDate } from "@/lib/format";
import { Building2, Calendar, Castle } from "lucide-react";
import { Card } from "./ui/card";

type Props = {
  username: string;
};

export const UserProfileInfo = async ({ username }: Props) => {
  const user = await getUserProfile({ username });

  return (
    <Card>
      <h5 className="font-semibold mb-8">
        {formatDisplayName({
          username,
          firstName: user.firstName,
          lastName: user.lastName,
        })}
      </h5>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Calendar className="size-4" />
        {formatRelativeDate(user.createdAt, {
          prefix: "Пришёл",
        })}
      </div>
      {user.age && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {user.age} лет.
        </div>
      )}
      {user.city && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Castle className="size-4" />
          {user.city}
        </div>
      )}
      {user.placeOfWork && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Building2 className="size-4" />
          {user.placeOfWork}
        </div>
      )}
    </Card>
  );
};
