import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  checkExist: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const { username } = input;
      const user = await ctx.db.user.findUnique({
        where: {
          username,
        },
      });

      return !!user;
    }),
  getProfile: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => {
      const { username } = input;

      return ctx.db.user.findUnique({
        where: {
          username,
        },
      });
    }),
  getUserGroups: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => {
      const { username } = input;

      return ctx.db.user.findUnique({
        where: {
          username,
        },
        select: {
          name: true,
          email: true,
          _count: {
            select: {
              groups: true,
            },
          },
          groups: {
            select: {
              avatar: true,
              title: true,
            },
          },
        },
      });
    }),
});
