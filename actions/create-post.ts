"use server";

import { db } from "@/lib/db";
import { postsTable } from "@/schema";
import { getCurrentUser } from "./get-current-user";
import { CreatePostSchema } from "@/schema/create-post";
import { revalidatePath } from "next/cache";

export const createPost = async ({ text }: CreatePostSchema) => {
  const { id: userId } = await getCurrentUser();

  await db.insert(postsTable).values({
    userId,
    text,
  });

  await revalidatePath("/profile/[username]", "page");
};
