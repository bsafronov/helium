import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const messageRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { chatId, content } = input;
      return ctx.db.message.create({
        data: {
          senderId: ctx.session.user.id,
          chatId,
          content,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ messageId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.db.message.findUnique({
        where: {
          id: input.messageId,
        },
      });

      if (!message) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      if (message.senderId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      return ctx.db.message.delete({
        where: {
          id: input.messageId,
        },
      });
    }),
});
