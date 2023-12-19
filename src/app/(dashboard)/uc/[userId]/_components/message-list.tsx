import { api } from "~/trpc/server";
import { MessageItem } from "./message-item";
import { auth } from "~/lib/auth";

type Props = {
  chatId: string;
};

export async function MessageList({ chatId }: Props) {
  const messages = await api.message.getManyUserToUser.query({ chatId });
  const currentUser = await auth();

  return (
    <ul className="flex grow flex-col justify-end gap-2 p-4">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          currentUser={currentUser}
        />
      ))}
    </ul>
  );
}
