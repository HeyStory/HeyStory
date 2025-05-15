import { z } from "zod";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { eventParticipants, events } from "~/server/db/schema";

export const eventRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        location: z.string(),
        createdBy: z.number(),
        tags: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await db.insert(events).values(input);
    }),

  addParticipant: publicProcedure
    .input(z.object({ eventId: z.number(), userId: z.number() }))
    .mutation(async ({ input }) => {
      await db.insert(eventParticipants).values(input);
    }),

  getLatest: publicProcedure
    .input(z.object({ limit: z.number().default(1) }))
    .query(async ({ input }) => {
      const event = await db
        .select()
        .from(events)
        .orderBy(desc(events.createdAt))
        .limit(input.limit);
      return event ?? null;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        offset: z.number().default(0),
      }),
    )
    .query(async ({ input }) => {
      const event = await db
        .select()
        .from(events)
        .orderBy(desc(events.createdAt))
        .limit(input.limit)
        .offset(input.offset);
      return event ?? null;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(
      async ({ input }) =>
        await db.select().from(events).where(eq(events.id, input.id)),
    ),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        date: z.date(),
        location: z.string(),
      }),
    )
    .mutation(
      async ({ input }) =>
        await db
          .update(events)
          .set({
            title: input.title,
            description: input.description,
            date: input.date,
            location: input.location,
          })
          .where(eq(events.id, input.id)),
    ),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(
      async ({ input }) =>
        await db.delete(events).where(eq(events.id, input.id)),
    ),

  getByDateRange: publicProcedure
    .input(z.object({ startDate: z.date(), endDate: z.date() }))
    .query(
      async ({ input }) =>
        await db
          .select()
          .from(events)
          .where(
            and(
              gte(events.date, input.startDate),
              lte(events.date, input.endDate),
            ),
          ),
    ),

  getByLocation: publicProcedure
    .input(z.object({ location: z.string() }))
    .query(
      async ({ input }) =>
        await db
          .select()
          .from(events)
          .where(eq(events.location, input.location)),
    ),

  getByTitle: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(
      async ({ input }) =>
        await db.select().from(events).where(eq(events.title, input.title)),
    ),

  getByDate: publicProcedure
    .input(z.object({ date: z.date() }))
    .query(
      async ({ input }) =>
        await db.select().from(events).where(eq(events.date, input.date)),
    ),

  getByDateRangeAndLocation: publicProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        location: z.string(),
      }),
    )
    .query(
      async ({ input }) =>
        await db
          .select()
          .from(events)
          .where(
            and(
              gte(events.date, input.startDate),
              lte(events.date, input.endDate),
              eq(events.location, input.location),
            ),
          ),
    ),

  getByDateRangeAndTitle: publicProcedure
    .input(
      z.object({ startDate: z.date(), endDate: z.date(), title: z.string() }),
    )
    .query(
      async ({ input }) =>
        await db
          .select()
          .from(events)
          .where(
            and(
              gte(events.date, input.startDate),
              lte(events.date, input.endDate),
              eq(events.title, input.title),
            ),
          ),
    ),
});
