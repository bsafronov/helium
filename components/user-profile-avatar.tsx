import Image from "next/image";
import { Card } from "./ui/card";

type Props = {
  avatar?: string;
};

export const UserProfileAvatar = ({ avatar }: Props) => {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="border-b relative aspect-[3/4] min-w-48">
        <Image
          alt="avatar"
          src={avatar ?? "/car.jpg"}
          fill
          className="absolute object-cover"
        />
      </div>
    </Card>
  );
};
