import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const groupRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { title } = input;
      const authorId = ctx.session.user.id;

      return ctx.db.group.create({
        data: {
          title,
          createdById: authorId,
          adminIDs: [authorId],
          userIDs: [authorId],
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        avatar: z.string().optional(),
        description: z.string().optional(),
        isPublic: z.boolean().optional(),
        urlName: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, title, avatar, description, isPublic, urlName } = input;
      const userId = ctx.session.user.id;

      const group = await ctx.db.group.findUnique({
        where: {
          id,
        },
      });

      if (!group) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      if (!group.adminIDs.includes(userId)) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      return ctx.db.group.update({
        where: {
          id,
        },
        data: {
          title,
          avatar,
          description,
          isPublic,
          urlName,
        },
      });
    }),
});
