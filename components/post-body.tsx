type Props = {
  body?: string | null;
};
export const PostBody = ({ body }: Props) => {
  if (!body) return null;

  return (
    <div
      className="px-6 text-sm flex flex-col prose-sm"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
};
