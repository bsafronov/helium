import { getUserPosts } from "@/actions/get-user-posts";
import { PostBody } from "./post-body";
import { PostHeader } from "./post-header";
import { PostInteractions } from "./post-interactions";
import { Card } from "./ui/card";

type Props = {
  post: Awaited<ReturnType<typeof getUserPosts>>[number];
};
export const Post = ({ post }: Props) => {
  return (
    <Card className="p-0">
      <PostHeader createdAt={post.createdAt} user={post.user} />
      <PostBody body={post.text} />
      <PostInteractions />
      {/* <PostCommentForm /> */}
      {/* <PostCommentList /> */}
    </Card>
  );
};
