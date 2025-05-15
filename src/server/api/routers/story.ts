import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { stories } from "~/server/db/schema";

export const storyRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), userId: z.number() }),
    )
    .mutation(async ({ input }) => {
      await db.insert(stories).values(input);
    }),

  getAll: publicProcedure.query(async () => await db.select().from(stories)),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const story = await db
        .select()
        .from(stories)
        .where(eq(stories.id, input.id));
      return story ?? null;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        userId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      await db
        .update(stories)
        .set({
          title: input.title,
          content: input.content,
          createdBy: input.userId,
        })
        .where(eq(stories.id, input.id));
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(stories).where(eq(stories.id, input.id));
    }),

  getByUserId: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const story = await db
        .select()
        .from(stories)
        .where(eq(stories.createdBy, input.userId));
      return story;
    }),

  getByTitle: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      const story = await db
        .select()
        .from(stories)
        .where(eq(stories.title, input.title));
      return story;
    }),

  getByContent: publicProcedure
    .input(z.object({ content: z.string() }))
    .query(async ({ input }) => {
      const story = await db
        .select()
        .from(stories)
        .where(eq(stories.content, input.content));
      return story;
    }),

  getByCreatedBy: publicProcedure
    .input(z.object({ createdBy: z.number() }))
    .query(async ({ input }) => {
      const story = await db
        .select()
        .from(stories)
        .where(eq(stories.createdBy, input.createdBy));
      return story;
    }),
});
