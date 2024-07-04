import Link from "next/link";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserProfileFollowers = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Подписчики</CardTitle>
      </CardHeader>
      <ul className="flex items-center gap-2 overflow-x-scroll">
        <li>
          <Link href={`/`} className="flex flex-col items-center text-xs">
            <Avatar className="size-8">
              <AvatarImage />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <span>Богдан</span>
          </Link>
        </li>
        <li>
          <Link href={`/`} className="flex flex-col items-center text-xs">
            <Avatar className="size-8">
              <AvatarImage />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <span>Богдан</span>
          </Link>
        </li>
        <li>
          <Link href={`/`} className="flex flex-col items-center text-xs">
            <Avatar className="size-8">
              <AvatarImage />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <span>Богдан</span>
          </Link>
        </li>
        <li>
          <Link href={`/`} className="flex flex-col items-center text-xs">
            <Avatar className="size-8">
              <AvatarImage />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <span>Богдан</span>
          </Link>
        </li>
        <li>
          <Link href={`/`} className="flex flex-col items-center text-xs">
            <Avatar className="size-8">
              <AvatarImage />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <span>Богдан</span>
          </Link>
        </li>
      </ul>
    </Card>
  );
};
