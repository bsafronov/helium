"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "~/components/ui/use-toast";

const schema = z.object({
  title: z.string().min(3, { message: "Слишком короткое название!" }),
});

type Schema = z.infer<typeof schema>;

export function GroupCreateForm() {
  const router = useRouter();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const { mutateAsync: createGroup } = api.group.create.useMutation({
    onSuccess: (newGroup) => {
      router.push(`/dashboard/groups/${newGroup.urlName}`);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const onSubmit = async (data: Schema) => {
    const { title } = data;
    try {
      await createGroup({
        title,
      });
    } catch (e) {}
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название группы</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex justify-end">
          <Button>Создать</Button>
        </div>
      </form>
    </Form>
  );
}
