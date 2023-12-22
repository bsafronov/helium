import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sortIds(firstId: string, secondId: string) {
  const sorted = [firstId, secondId].sort();

  return sorted as [string, string];
}
