import { type RouterOutputs } from "~/trpc/shared";

export type UCMessage = RouterOutputs["message"]["getManyUserToUser"][number];
