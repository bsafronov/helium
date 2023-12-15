import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const chatRouter = createTRPCRouter({
  getMany: protectedProcedure.input(z.object({})).query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        chats: {
          select: {
            id: true,
            type: true,
            users: {
              take: 3,
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    return user;
  }),
  getOne: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;
      const chat = await ctx.db.chat.findUnique({
        where: {
          id: input.chatId,
        },
        include: {
          messages: {
            include: {
              sender: {
                select: {
                  name: true,
                  id: true,
                  image: true,
                },
              },
            },
          },
          users: true,
          images: true,
          _count: {
            select: {
              images: true,
              messages: true,
              users: true,
            },
          },
        },
      });

      if (!chat) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      if (!chat.userIDs.includes(currentUserId)) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      return chat;
    }),
  goToChatWithUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existedChat = await ctx.db.chat.findFirst({
        where: {
          AND: [
            {
              type: "SINGLE",
            },
            {
              OR: [
                {
                  userIDs: {
                    equals: [input.userId, ctx.session.user.id],
                  },
                },
                {
                  userIDs: {
                    equals: [ctx.session.user.id, input.userId],
                  },
                },
              ],
            },
          ],
        },
      });

      if (existedChat) {
        return existedChat;
      }

      return ctx.db.chat.create({
        data: {
          type: "SINGLE",
          users: {
            connect: [{ id: ctx.session.user.id }, { id: input.userId }],
          },
        },
      });
    }),
});
