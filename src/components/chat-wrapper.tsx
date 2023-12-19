type Props = {
  children?: React.ReactNode;
};

export function ChatWrapper({ children }: Props) {
  return <div className="flex h-full max-h-screen flex-col">{children}</div>;
}
