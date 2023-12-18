import { api } from "~/trpc/server";
import { MessageItem } from "./message-item";

type Props = {
  chatId: string;
};

export async function MessageList({ chatId }: Props) {
  const messages = await api.message.getMany.query({ chatId });

  return (
    <ul className="flex grow flex-col justify-end p-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </ul>
  );
}
