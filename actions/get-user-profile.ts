"use server";

import { db } from "@/lib/db";
import { usersTable } from "@/schema";
import { eq } from "drizzle-orm";

export const getUserProfile = async ({ username }: { username: string }) => {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, username),

    with: {
      avatar: true,
      posts: {
        columns: {
          id: true,
        },
      },
      outgoingFollows: {
        columns: {
          targetUserId: true,
        },
      },
      incomingFollows: {
        columns: {
          sourceUserId: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  return user;
};
