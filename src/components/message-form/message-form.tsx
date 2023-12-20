"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SendHorizonal } from "lucide-react";
import { type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Form, FormField } from "../ui/form";
import { TextareaAutoSize } from "../ui/textarea";
import { toast } from "../ui/use-toast";

const schema = z.object({
  content: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

type Props = {
  chatId: string;
};

export function MessageForm({ chatId }: Props) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate: sendMessage, isLoading } = api.message.create.useMutation({
    onMutate: () => {
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Возникла ошибка при отправке сообщения.",
      });
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
        <button disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin text-sky-500" />
          ) : (
            <SendHorizonal className="text-border hover:text-sky-500" />
          )}
        </button>
      </form>
    </Form>
  );
}
