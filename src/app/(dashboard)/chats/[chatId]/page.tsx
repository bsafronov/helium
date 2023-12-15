import { auth } from "~/lib/auth";
import { api } from "~/trpc/server";
import { ChatBody } from "./_components/chat-body";
import { ChatGroupHeader } from "./_components/chat-group-header";
import { ChatSingleHeader } from "./_components/chat-single-header";
import { MessageForm } from "./_components/message-form";

type Props = {
  params: {
    chatId: string;
  };
};

export default async function Page({ params: { chatId } }: Props) {
  // const currentUser = await auth();
  const { _count, createdAt, id, images, messages, type, userIDs, users } =
    await api.chat.getOne.query({ chatId });

  // await sleep();
  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 items-center border-b px-4">
        <h1 className="text-lg">
          {type === "SINGLE" && <ChatSingleHeader users={users} />}
          {type !== "SINGLE" && <ChatGroupHeader users={users} />}
        </h1>
      </header>
      <ChatBody messages={messages} />
      <MessageForm chatId={id} />
    </div>
  );
}
