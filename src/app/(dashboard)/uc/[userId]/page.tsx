import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "~/components/avatar";
import { ChatWrapper } from "~/components/chat-wrapper";
import { MessageForm } from "~/components/message-form/message-form";
import { PageHeader } from "~/components/page-header";
import { api } from "~/trpc/server";
import { MessageList } from "./_components/message-list";
import { auth } from "~/lib/auth";

type Props = {
  params: {
    userId: string;
  };
};

export default async function Page({ params: { userId } }: Props) {
  const currentUser = await auth();
  const otherUserInitials = await api.user.getOneInitials.query({ userId });

  if (!otherUserInitials) {
    return notFound();
  }

  const { image, name } = otherUserInitials;

  const chat = await api.chat.getOneUserToUser.query({ userId });

  return (
    <ChatWrapper>
      <PageHeader>
        <div className="flex gap-4">
          <Link href={`/u/${userId}`}>
            <Avatar image={image} />
          </Link>
          <div className="flex flex-col">
            <span className="text-sm">{name}</span>
            <span className="text-xs text-muted-foreground">В сети</span>
          </div>
        </div>
      </PageHeader>
      <MessageList chatId={chat.id} currentUser={currentUser} />
      <MessageForm chatId={chat.id} />
    </ChatWrapper>
  );
}
