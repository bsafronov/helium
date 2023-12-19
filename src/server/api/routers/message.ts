import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
      return ctx.db.message.create({
        data: {
          chatId: input.chatId,
          content: input.content,
          userId: ctx.session.user.id,
        },
      });
    }),
});
