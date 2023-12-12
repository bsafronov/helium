import { type LucideIcon } from "lucide-react";
import { IconLabel } from "./ui/icon-label";

type Props = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

export function Heading({ title, subtitle, icon }: Props) {
  return (
    <div className="flex items-center gap-4 p-4">
      <IconLabel icon={icon} />
      <div>
        <h1 className="text-3xl font-extrabold">{title}</h1>
        {subtitle && (
          <h3 className="text-muted-foreground text-sm">{subtitle}</h3>
        )}
      </div>
    </div>
  );
}
