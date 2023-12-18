import { api } from "~/trpc/server";
import { ChatItem } from "./chat-item";
import { auth } from "~/lib/auth";

export async function ChatList() {
  const { chats } = await api.chat.getManyThisUser.query();
  const { id } = await auth();

  if (chats.length === 0) {
    return null;
  }

  return (
    <div className="border-b">
      <div className="border-b bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
        Чаты
      </div>
      <ul className="divide-y">
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} currentUserId={id} />
        ))}
      </ul>
    </div>
  );
}
