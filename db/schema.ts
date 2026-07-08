import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const shortLinks = pgTable("short_links", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  destination: text("destination").notNull(),
  userId: varchar("user_id", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
