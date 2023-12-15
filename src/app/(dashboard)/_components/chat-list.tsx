import { auth } from "~/lib/auth";
import { api } from "~/trpc/server";
import { ChatItem } from "./chat-item";

export async function ChatList() {
  const currentUser = await auth();
  const { chats } = await api.chat.getMany.query({ userId: currentUser.id });

  if (chats.length === 0) {
    return null;
  }

  return (
    <div className="border-b">
      <div className="border-b bg-muted/50 px-4 text-sm text-muted-foreground">
        Чаты
      </div>
      <ul className="divide-y">
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} currentUser={currentUser} />
        ))}
      </ul>
    </div>
  );
}
