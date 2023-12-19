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
const schema = z.object({
  content: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

type Props = {
  chatId: string;
};

export function MessageForm({ chatId }: Props) {
  const router = useRouter();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate: sendMessage } = api.message.create.useMutation({
    onSuccess: () => {
      form.reset();
      router.refresh();
    },
  });

  const onSubmit = (data: Schema) => {
    const { content } = data;

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
