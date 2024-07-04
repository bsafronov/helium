import { SendHorizonal } from "lucide-react";
import { Textarea } from "./ui/textarea";

export const PostCommentForm = () => {
  return (
    <div className="border-y p-6 flex items-center gap-4">
      <Textarea placeholder="Оставить комментарий" />
      <button>
        <SendHorizonal />
      </button>
    </div>
  );
};
