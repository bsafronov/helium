import { type RouterOutputs } from "~/trpc/shared";

export type NavChat = RouterOutputs["chat"]["getManyThisUser"]["chats"][number];
