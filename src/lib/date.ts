import { differenceInDays, format, isThisYear } from "date-fns";

const daysDifference: Record<number, string> = {
  0: "сегодня",
  1: "вчера",
  2: "позавчера",
};

export function formatChatDate(value: Date | string) {
  const date = new Date(value);
  const difference = differenceInDays(new Date(), date);
  const _isThisYear = isThisYear(date);

  const relativeDate = daysDifference[difference];

  if (relativeDate) {
    return relativeDate;
  }

  return _isThisYear ? format(date, "dd.MM") : format(date, "dd.MM.yyyy");
}
