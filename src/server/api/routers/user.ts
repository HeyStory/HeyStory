import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        fullName: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        address: z.string().optional(),
        relation: z.string().optional(),
        description: z.string().optional(),
        avatarUrl: z.string().optional(),
        tags: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await db.insert(users).values(input).returning();
    }),

  getLatest: publicProcedure
    .input(z.object({ limit: z.number().default(1) }))
    .query(async ({ input }) => {
      const user = await db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(input.limit);
      return user ?? null;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        offset: z.number().default(0),
      }),
    )
    .query(async ({ input }) => {
      const user = await db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(input.limit)
        .offset(input.offset);
      return user ?? null;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const user = await db.select().from(users).where(eq(users.id, input.id));
      return user ?? null;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        fullName: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        relation: z.string(),
        description: z.string(),
        avatarUrl: z.string(),
        tags: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await db.update(users).set(input).where(eq(users.id, input.id));
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(users).where(eq(users.id, input.id));
    }),

  getByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email));
      return user;
    }),

  getByFullName: publicProcedure
    .input(z.object({ fullName: z.string() }))
    .query(async ({ input }) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.fullName, input.fullName));
      return user;
    }),

  getByRelation: publicProcedure
    .input(z.object({ relation: z.string() }))
    .query(async ({ input }) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.relation, input.relation));
      return user;
    }),
});
