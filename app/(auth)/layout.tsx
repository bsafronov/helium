type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-full flex justify-center items-center">
      {children}
    </div>
  );
}
