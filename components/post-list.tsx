import { getUserPosts } from "@/actions/get-user-posts";
import { Post } from "./post";

type Props = {
  posts: Awaited<ReturnType<typeof getUserPosts>>;
};

export const PostList = ({ posts }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};
