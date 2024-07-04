import { SendHorizonal } from "lucide-react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";

export const AddPostForm = () => {
  return (
    <Card className="flex gap-4">
      <Textarea placeholder="Что у вас нового?" />
      <button>
        <SendHorizonal />
      </button>
    </Card>
  );
};
