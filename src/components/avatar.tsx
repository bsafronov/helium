import {
  AvatarFallback,
  AvatarImage,
  Avatar as SAvatar,
} from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

type Props = {
  image?: string | null;
  size?: "sm" | "md" | "lg";
};

export function Avatar({ image, size = "md" }: Props) {
  return (
    <SAvatar
      className={cn({
        "h-8 w-8": size === "sm",
        "h-10 w-10": size === "md",
        "h-16 w-16": size === "lg",
      })}
    >
      <AvatarImage src={image ?? undefined} />
      <AvatarFallback
        className={cn({
          "text-sm": size === "sm",
          "text-lg": size === "md",
          "text-4xl": size === "lg",
        })}
      >
        🐱
      </AvatarFallback>
    </SAvatar>
  );
}
