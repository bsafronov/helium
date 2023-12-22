import { ChatSubscriptionProvider } from "./_modules/subscription/chat-subscription-provider";

type Props = {
  children?: React.ReactNode;
  params: {
    chatId: string;
  };
};

export default function ChatLayout({ children, params: { chatId } }: Props) {
  return (
    <>
      <ChatSubscriptionProvider chatId={chatId} />
      {children}
    </>
  );
}
