import { z } from "zod";

export const createPostSchema = z.object({
  text: z.string().min(1, { message: "Текст не может быть пустым" }),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
