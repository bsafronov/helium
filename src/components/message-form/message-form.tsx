"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import { type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Form, FormField } from "../ui/form";
import { TextareaAutoSize } from "../ui/textarea";
import { useAuth } from "~/hooks/use-auth";

const schema = z.object({
  content: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

type Props = {
  chatId: string;
};

export function MessageForm({ chatId }: Props) {
  const router = useRouter();
  const currentUserId = useAuth()?.id;

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
    },
  });
  const ctx = api.useUtils();
  const messages = ctx.message.getManyUserToUser;

  const { mutate: sendMessage } = api.message.create.useMutation({
    onMutate: (newMessage) => {
      if (!currentUserId) return;
      const prevMessages = ctx.message.getManyUserToUser.getData({ chatId });
      messages.setData({ chatId }, (old) => {
        return [
          ...(old ?? []),
          {
            chatId,
            content: newMessage.content,
            createdAt: new Date(),
            id: new Date().toISOString(),
            replyToId: null,
            seenByIDs: [],
            updatedAt: new Date(),
            user: {
              id: currentUserId,
            },
            userId: currentUserId,
            pending: true,
          },
        ];
      });
      form.reset();
      window.scrollTo(0, document.body.scrollHeight);
      return {
        prevMessages,
      };
    },
    onSuccess: () => {
      router.refresh();
    },
    onError: (err, newMessage, context) => {
      messages.setData({ chatId }, context?.prevMessages);
    },
    onSettled: async () => {
      await messages.invalidate({ chatId });
    },
  });

  const onSubmit = (data: Schema) => {
    const { content } = data;

    if (content.trim().length === 0) {
      return;
    }

    sendMessage({
      chatId,
      content,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-2 px-2 py-2"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <TextareaAutoSize
              onKeyDown={(e) => handleKeyDown(e)}
              autoFocus
              placeholder="Написать сообщение..."
              {...field}
            />
          )}
        />
        <button>
          <SendHorizonal className="text-border hover:text-blue-500" />
        </button>
      </form>
    </Form>
  );
}
