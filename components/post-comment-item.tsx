import { Heart, Reply } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const PostCommentItem = () => {
  return (
    <div className="px-6">
      <div className="flex gap-2">
        <Avatar className="text-xs size-8 border">
          <AvatarImage />
          <AvatarFallback>BS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-xs border-b pb-2 group">
          <div className="flex items-center gap-4">
            <span className="font-semibold">Богдан Сафронов</span>
            <span className="text-muted-foreground">4 минуты назад</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            adipisci sequi est vitae quibusdam vero perspiciatis error
            voluptate! Vitae, non. Earum dolore sapiente nobis officiis et ut
            eligendi, reiciendis repudiandae?
          </p>
          <div className="mt-2 flex items-center gap-2 group-hover:opacity-100 opacity-0">
            <button className="flex items-center py-0.5 px-2 rounded-full gap-2 text-sm bg-muted text-muted-foreground hover:text-primary">
              <Heart className="size-4" />0
            </button>
            <button className="flex items-center py-0.5 px-2 rounded-full gap-2 text-sm bg-muted text-muted-foreground hover:text-primary">
              <Reply className="size-4" />0
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
