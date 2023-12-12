import { type VariantProps, cva } from "class-variance-authority";
import { type LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

type Props = {
  icon: LucideIcon;
} & VariantProps<typeof iconButtonVariants>;

const iconButtonVariants = cva(
  "flex justify-center items-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
      },
      size: {
        default: "h-12 w-12",
        sm: "h-6 w-6",
        lg: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const IconLabel = ({ icon: Icon, size, variant }: Props) => {
  return (
    <div className={cn(iconButtonVariants({ variant, size }))}>
      <Icon className="h-2/3 w-2/3" />
    </div>
  );
};
