import { Heart, MessageCircle } from "lucide-react";

export const PostInteractions = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <button className="flex items-center py-0.5 px-2 rounded-full gap-2 text-sm bg-muted text-muted-foreground hover:text-primary">
          <Heart className="size-4" />0
        </button>
        <button className="flex items-center py-0.5 px-2 rounded-full gap-2 text-sm bg-muted text-muted-foreground hover:text-primary">
          <MessageCircle className="size-4" />0
        </button>
      </div>
    </div>
  );
};
