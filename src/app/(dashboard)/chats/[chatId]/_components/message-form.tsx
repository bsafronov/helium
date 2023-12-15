"use client";

import { SendHorizonal } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextareaAutoSize } from "~/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "~/components/ui/form";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

type Props = {
  chatId: string;
};

const schema = z.object({
  content: z.string().min(1),
});

type Schema = z.infer<typeof schema>;
export function MessageForm({ chatId }: Props) {
  const router = useRouter();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate } = api.message.create.useMutation({
    onSuccess: () => {
      form.reset();
      router.refresh();
    },
  });

  const onSubmit = (data: Schema) => {
    mutate({
      chatId,
      content: data.content,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative border-t pb-1 pl-4 pr-16 pt-2"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <TextareaAutoSize
              className="rounded-none border-none p-0"
              placeholder="Напишите что-нибудь..."
              {...field}
            />
          )}
        />
        <button className="absolute bottom-1.5 right-4 text-muted-foreground hover:text-primary">
          <SendHorizonal />
        </button>
      </form>
    </Form>
  );
}
