"use server";

import { db } from "@/lib/db";
import { reactionsTable } from "@/schema";
import { and, eq } from "drizzle-orm";
import { getCurrentUser } from "./get-current-user";

export const reactToPost = async (postId: number) => {
  const { id: userId } = await getCurrentUser();

  const existingReaction = await db.query.reactionsTable.findFirst({
    where: and(
      eq(reactionsTable.postId, postId),
      eq(reactionsTable.userId, userId)
    ),
  });

  if (existingReaction) {
    return await db
      .delete(reactionsTable)
      .where(
        and(
          eq(reactionsTable.postId, postId),
          eq(reactionsTable.userId, userId)
        )
      );
  }

  return await db.insert(reactionsTable).values({
    userId,
    postId,
  });
};
