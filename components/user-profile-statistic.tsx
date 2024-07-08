import { getUserProfile } from "@/actions/get-user-profile";
import { Card } from "./ui/card";

type Props = {
  username: string;
};
export const UserProfileStatistic = async ({ username }: Props) => {
  const user = await getUserProfile({ username });

  return (
    <Card className="p-0">
      <ul className="flex flex-col text-sm my-2">
        <li className="flex items-center justify-between px-2 gap-4">
          <span>Посты</span>
          <span>{user.posts.length}</span>
        </li>
        <li className="flex items-center justify-between px-2 gap-4">
          <span>Подписчики</span>
          <span>{user.incomingFollows.length}</span>
        </li>
        <li className="flex items-center justify-between px-2 gap-4">
          <span>Подписки</span>
          <span>{user.outgoingFollows.length}</span>
        </li>
      </ul>
    </Card>
  );
};
