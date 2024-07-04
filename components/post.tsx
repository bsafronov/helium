import { PostBody } from "./post-body";
import { PostCommentForm } from "./post-comment-form";
import { PostCommentList } from "./post-comment-list";
import { PostHeader } from "./post-header";
import { PostInteractions } from "./post-interactions";
import { Card } from "./ui/card";

export const Post = () => {
  return (
    <Card className="p-0">
      <PostHeader />
      <PostBody />
      <PostInteractions />
      <PostCommentForm />
      <PostCommentList />
    </Card>
  );
};
