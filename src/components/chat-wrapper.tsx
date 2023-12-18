type Props = {
  children?: React.ReactNode;
};

export function ChatWrapper({ children }: Props) {
  return <div className="flex h-full flex-col">{children}</div>;
}
