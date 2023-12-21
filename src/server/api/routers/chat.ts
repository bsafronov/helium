import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { sortIds } from "~/lib/utils";
import { pusherServer } from "~/lib/pusher";

export const chatRouter = createTRPCRouter({
  getManyThisUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUniqueOrThrow({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        chats: {
          select: {
            id: true,
            type: true,
            firstUserId: true,
            secondUserId: true,
            title: true,
            users: {
              take: 2,
            },
            messages: {
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
              select: {
                content: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });
  }),
  getOneUserToUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const [firstId, secondId] = sortIds(ctx.session.user.id, input.userId);

      const chat = await ctx.db.chat.findUnique({
        where: {
          firstUserId_secondUserId: {
            firstUserId: firstId,
            secondUserId: secondId,
          },
        },
      });

      if (chat) {
        return chat;
      }

      const newChat = await ctx.db.chat.create({
        data: {
          firstUserId: firstId,
          secondUserId: secondId,
          users: {
            connect: [{ id: firstId }, { id: secondId }],
          },
          type: "ONE_TO_ONE",
        },
        select: {
          id: true,
          type: true,
          firstUserId: true,
          secondUserId: true,
          title: true,
          users: {
            take: 2,
          },
        },
      });

      newChat.users.forEach((user) => {
        void pusherServer.trigger(user.id, "chat:new", newChat);
      });

      return newChat;
    }),
});
