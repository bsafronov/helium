import Image from "next/image";
import { Card } from "./ui/card";

export const UserProfileAvatar = () => {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="border-b relative aspect-[3/4] min-w-48">
        <Image
          alt="avatar"
          src={"/car.jpg"}
          fill
          className="absolute object-cover"
        />
      </div>
    </Card>
  );
};
