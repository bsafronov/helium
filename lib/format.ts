import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "./utils";

export const formatDisplayName = ({
  username,
  firstName,
  lastName,
}: {
  username: string;
  firstName?: string | null;
  lastName?: string | null;
}) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return username;
};

type FormatRelativeDateProps = {
  prefix?: string;
};

export const formatRelativeDate = (
  date: Date | string,
  formatRelativeDateProps?: FormatRelativeDateProps
) => {
  return cn(
    formatRelativeDateProps?.prefix,
    formatRelative(new Date(date), new Date(), {
      locale: ru,
    })
  );
};
