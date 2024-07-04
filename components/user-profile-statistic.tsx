import { Card } from "./ui/card";

export const UserProfileStatistic = () => {
  return (
    <Card className="p-0">
      <ul className="flex flex-col text-sm my-2">
        <li className="flex items-center justify-between px-2 gap-4">
          <span>Посты</span>
          <span>0</span>
        </li>
        <li className="flex items-center justify-between px-2 gap-4">
          <span>Подписчики</span>
          <span>0</span>
        </li>
        <li className="flex items-center justify-between px-2 gap-4">
          <span>Подписки</span>
          <span>0</span>
        </li>
      </ul>
    </Card>
  );
};
