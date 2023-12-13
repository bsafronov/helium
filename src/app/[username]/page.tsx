import { Breadcrumbs } from "~/components/breadcrumbs";

type Props = {
  params: {
    username: string;
  };
};

export default async function Page({ params: { username } }: Props) {
  return (
    <>
      <Breadcrumbs items={[]} />
    </>
  );
}
