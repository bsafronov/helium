type Props = {
  description: string;
};

export function NoMatch({ description }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-4">
      <span className="text-7xl">😿</span>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
