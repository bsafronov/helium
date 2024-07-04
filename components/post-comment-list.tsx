import { PostCommentItem } from "./post-comment-item";

export const PostCommentList = () => {
  return (
    <div className="space-y-4 py-4">
      <PostCommentItem />
      <PostCommentItem />
      <PostCommentItem />
    </div>
  );
};
