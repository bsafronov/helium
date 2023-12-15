import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => {
      const { username } = input;
      return ctx.db.user.findUnique({ where: { username } });
    }),
  getManyPublic: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
});
