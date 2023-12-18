import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getOneInitials: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.userId,
        },
        select: {
          name: true,
          image: true,
        },
      });
    }),
  getManyPublicUsers: protectedProcedure
    .input(z.object({}))
    .query(({ ctx }) => {
      return ctx.db.user.findMany({
        where: {
          id: {
            not: ctx.session.user.id,
          },
        },
      });
    }),
});
