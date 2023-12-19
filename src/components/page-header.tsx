import { cn } from "~/lib/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function PageHeader({ children, className }: Props) {
  return (
    <header
      className={cn(
        "flex max-h-[4rem] min-h-[4rem] items-center justify-between border-b px-4",
        className,
      )}
    >
      {children}
    </header>
  );
}
