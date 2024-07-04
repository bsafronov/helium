import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const PostHeader = () => {
  return (
    <div className="p-6 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Avatar className="size-12">
          <AvatarImage />
          <AvatarFallback>BS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-sm">
          <span className="font-semibold">Богдан Сафронов</span>
          <span className="text-muted-foreground text-xs">4 июля 2024 г.</span>
        </div>
      </div>
      <button className="text-muted-foreground">
        <MoreHorizontal />
      </button>
    </div>
  );
};
