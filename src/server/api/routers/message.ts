import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pusherServer } from "~/lib/pusher";

export const messageRouter = createTRPCRouter({
  getManyUserToUser: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.message.findMany({
        where: {
          chatId: input.chatId,
        },
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { chatId, content } = input;
      const message = await ctx.db.message.create({
        data: {
          chatId: chatId,
          content: content,
          userId: ctx.session.user.id,
          seenByIDs: [ctx.session.user.id],
        },
      });

      const chat = await ctx.db.chat.findUnique({
        where: {
          id: chatId,
        },
        include: {
          users: true,
        },
      });

      await pusherServer.trigger(chatId, "messages:new", message);

      chat?.users.map((user) => {
        void pusherServer.trigger(user.id, "chat:update", {
          id: chatId,
          messages: [message],
        });
      });

      return message;
    }),
  createSeen: protectedProcedure
    .input(
      z.object({
        messageId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { messageId } = input;
      const message = await ctx.db.message.update({
        where: {
          id: messageId,
        },
        data: {
          seenByIDs: {
            push: ctx.session.user.id,
          },
        },
      });

      await pusherServer.trigger(message.chatId, "message:seen", message);
      return message;
    }),
});
