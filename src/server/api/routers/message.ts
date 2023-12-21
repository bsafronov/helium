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
      await pusherServer.trigger(chatId, "messages:new", message);

      const chat = await ctx.db.chat.findUnique({
        where: {
          id: chatId,
        },
      });

      chat?.userIDs.forEach((id) => {
        void pusherServer.trigger(id, "chat:update", {
          chatId,
          message,
        });
      });

      return message;
    }),
  createSeen: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
        messageIDs: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { messageIDs, chatId } = input;
      await ctx.db.message.updateMany({
        where: {
          id: {
            in: messageIDs,
          },
        },
        data: {
          seenByIDs: {
            push: ctx.session.user.id,
          },
        },
      });

      void pusherServer.trigger(chatId, "messages:seen", {
        messageIDs,
        userId: ctx.session.user.id,
      });

      return true;
    }),
});
