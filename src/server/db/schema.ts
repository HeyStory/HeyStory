// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `heystory_${name}`);

// Users Table (Family Members)
export const users = createTable("users", (user) => ({
  id: user.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  fullName: user.varchar("full_name", { length: 255 }),
  email: user.varchar("email", { length: 255 }).notNull().unique(),
  phone: user.varchar("phone", { length: 20 }),
  address: user.text("address"),
  relation: user.varchar("relation", { length: 100 }),
  description: user.text("description"),
  avatarUrl: user.varchar("avatar_url", { length: 500 }),
  tags: user.text("tags"),
  createdAt: user
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: user.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}));

// Stories Table
export const stories = createTable("stories", (story) => ({
  id: story.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  title: story.varchar("title", { length: 255 }).notNull(),
  content: story.text("content"),
  createdBy: story.integer("created_by").references(() => users.id),
  tags: story.text("tags"),
  createdAt: story
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: story.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}));

// Files Table (Photo, Video, Audio, Document, AI Outputs)
export const files = createTable("files", (file) => ({
  id: file.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  type: file.varchar("type", { length: 50 }).notNull(), // photo, video, audio, document, ai
  fileUrl: file.varchar("file_url", { length: 500 }).notNull(),
  description: file.text("description"),
  uploadedBy: file.integer("uploaded_by").references(() => users.id),
  tags: file.text("tags"),
  createdAt: file
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: file.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}));

// Events Table
export const events = createTable("events", (event) => ({
  id: event.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  title: event.varchar("title", { length: 255 }).notNull(),
  description: event.text("description"),
  date: event.timestamp("date").notNull(),
  location: event.varchar("location", { length: 255 }),
  createdBy: event.integer("created_by").references(() => users.id),
  createdAt: event
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: event.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}));

// Event Participants
export const eventParticipants = createTable(
  "event_participants",
  (eventParticipant) => ({
    id: eventParticipant
      .integer("id")
      .primaryKey()
      .generatedByDefaultAsIdentity(),
    eventId: eventParticipant.integer("event_id").references(() => events.id),
    userId: eventParticipant.integer("user_id").references(() => users.id),
    invitedVia: eventParticipant.varchar("invited_via", { length: 100 }), // phone, email
    accepted: eventParticipant.boolean("accepted").default(false),
    createdAt: eventParticipant
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: eventParticipant
      .timestamp({ withTimezone: true })
      .$onUpdate(() => new Date()),
  }),
);

// AI Creations Table
export const aiCreations = createTable("ai_creations", (aiCreation) => ({
  id: aiCreation.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  fileId: aiCreation.integer("file_id").references(() => files.id),
  storyId: aiCreation.integer("story_id").references(() => stories.id),
  createdBy: aiCreation.integer("created_by").references(() => users.id),
  type: aiCreation.varchar("type", { length: 100 }), // e.g., video montage, ai story
  createdAt: aiCreation
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: aiCreation
    .timestamp({ withTimezone: true })
    .$onUpdate(() => new Date()),
}));

// Family Members Table
export const familyMembers = createTable("family_members", (familyMember) => ({
  id: familyMember.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: familyMember.integer("user_id").references(() => users.id),
  familyId: familyMember.integer("family_id").references(() => families.id),
  relation: familyMember.varchar("relation", { length: 100 }),
  createdAt: familyMember
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: familyMember
    .timestamp({ withTimezone: true })
    .$onUpdate(() => new Date()),
}));

// Families Table
export const families = createTable("families", (family) => ({
  id: family.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: family.varchar("name", { length: 255 }).notNull(),
  createdAt: family
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: family
    .timestamp({ withTimezone: true })
    .$onUpdate(() => new Date()),
}));
