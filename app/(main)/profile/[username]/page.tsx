import { AddPostForm } from "@/components/add-post-form";
import { Post } from "@/components/post";
import { UserProfileAvatar } from "@/components/user-profile-avatar";
import { UserProfileInfo } from "@/components/user-profile-info";
import { UserProfileStatistic } from "@/components/user-profile-statistic";

type Props = {
  params: {
    username: string;
  };
};

export default async function Page({ params }: Props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <UserProfileAvatar />
        <UserProfileStatistic />
        {/* <UserProfileFollowers /> */}
      </div>
      <div className="flex flex-col gap-4 col-span-2">
        <UserProfileInfo />
        <AddPostForm />
        <Post />
      </div>
    </>
  );
}
