import { getUserPosts } from "@/actions/get-user-posts";
import { CreatePostForm } from "@/components/create-post-form";
import { PostList } from "@/components/post-list";
import { UserProfileAvatar } from "@/components/user-profile-avatar";
import { UserProfileInfo } from "@/components/user-profile-info";
import { UserProfileStatistic } from "@/components/user-profile-statistic";

type Props = {
  params: {
    username: string;
  };
};

export default async function Page({ params }: Props) {
  const posts = await getUserPosts({ username: params.username });
  const user = posts[0].user;

  return (
    <>
      <div className="flex flex-col gap-4">
        <UserProfileAvatar avatar={user.avatar?.url} />
        <UserProfileStatistic username={params.username} />
      </div>
      <div className="flex flex-col gap-4 grow">
        <UserProfileInfo username={params.username} />
        <CreatePostForm />
        <PostList posts={posts} />
      </div>
    </>
  );
}
