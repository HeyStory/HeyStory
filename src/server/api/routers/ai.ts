import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { aiCreations } from "~/server/db/schema";

export const aiRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        type: z.string(),
        fileUrl: z.string(),
        description: z.string().optional(),
        uploadedBy: z.number(),
        tags: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await db.insert(aiCreations).values(input);
    }),

  getAll: publicProcedure.query(async () => {
    const ai = await db.select().from(aiCreations);
    return ai;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const ai = await db
        .select()
        .from(aiCreations)
        .where(eq(aiCreations.id, input.id));
      return ai;
    }),

  getByStoryId: publicProcedure
    .input(z.object({ storyId: z.number() }))
    .query(async ({ input }) => {
      const ai = await db
        .select()
        .from(aiCreations)
        .where(eq(aiCreations.storyId, input.storyId));
      return ai;
    }),
});
