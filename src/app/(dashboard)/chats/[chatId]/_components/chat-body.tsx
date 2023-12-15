import { type RouterOutputs } from "~/trpc/shared";
import { Message } from "./message";
import { auth } from "~/lib/auth";

type Props = {
  messages: RouterOutputs["chat"]["getOne"]["messages"];
};

export async function ChatBody({ messages }: Props) {
  const currentUser = await auth();
  console.log(messages);

  return (
    <ul className="flex grow flex-col justify-end gap-2 p-4">
      {messages.map((message) => (
        <Message message={message} key={message.id} currentUser={currentUser} />
      ))}
    </ul>
  );
}
