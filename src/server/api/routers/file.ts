import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { files } from "~/server/db/schema";

export const fileRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        type: z.string(),
        fileUrl: z.string(),
        uploadedBy: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await db.insert(files).values({
        type: input.type,
        fileUrl: input.fileUrl,
        uploadedBy: input.uploadedBy,
      });
    }),

  getAll: publicProcedure.query(async () => await db.select().from(files)),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const file = await db.select().from(files).where(eq(files.id, input.id));
      return file ?? null;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        type: z.string(),
        fileUrl: z.string(),
        uploadedBy: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      await db
        .update(files)
        .set({
          type: input.type,
          fileUrl: input.fileUrl,
          uploadedBy: input.uploadedBy,
        })
        .where(eq(files.id, input.id));
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(files).where(eq(files.id, input.id));
    }),

  getByType: publicProcedure
    .input(z.object({ type: z.string() }))
    .query(async ({ input }) => {
      const file = await db
        .select()
        .from(files)
        .where(eq(files.type, input.type));
      return file;
    }),

  getByFileUrl: publicProcedure
    .input(z.object({ fileUrl: z.string() }))
    .query(async ({ input }) => {
      const file = await db
        .select()
        .from(files)
        .where(eq(files.fileUrl, input.fileUrl));
      return file;
    }),

  getByUploadedBy: publicProcedure
    .input(z.object({ uploadedBy: z.number() }))
    .query(async ({ input }) => {
      const file = await db
        .select()
        .from(files)
        .where(eq(files.uploadedBy, input.uploadedBy));
      return file;
    }),

  getByTypeAndFileUrl: publicProcedure
    .input(z.object({ type: z.string(), fileUrl: z.string() }))
    .query(async ({ input }) => {
      const file = await db
        .select()
        .from(files)
        .where(
          and(eq(files.type, input.type), eq(files.fileUrl, input.fileUrl)),
        );
      return file;
    }),

  getByTypeAndUploadedBy: publicProcedure
    .input(z.object({ type: z.string(), uploadedBy: z.number() }))
    .query(async ({ input }) => {
      const file = await db
        .select()
        .from(files)
        .where(
          and(
            eq(files.type, input.type),
            eq(files.uploadedBy, input.uploadedBy),
          ),
        );
      return file;
    }),
});
