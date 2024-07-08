"use server";

import { db } from "@/lib/db";
import { postsTable, usersTable } from "@/schema";
import { desc, eq } from "drizzle-orm";

export const getUserPosts = async ({ username }: { username: string }) => {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, username),
  });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  return await db.query.postsTable.findMany({
    where: eq(postsTable.userId, user.id),
    orderBy: desc(postsTable.createdAt),
    with: {
      user: {
        with: {
          avatar: true,
        },
      },
    },
  });
};
