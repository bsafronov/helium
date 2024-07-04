import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const id = serial("id").primaryKey();
export const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();
export const userId = integer("user_id")
  .notNull()
  .references(() => usersTable.id);

export const usersTable = pgTable("users", {
  id,
  createdAt,
  username: varchar("username", { length: 256 })
    .notNull()
    .$defaultFn(() => sql`uuid_generate_v4()`),
  hashPassword: varchar("hash_password", { length: 256 }).notNull(),
});

export const usersRelations = relations(usersTable, ({ many, one }) => ({
  sessions: many(sessionsTable),
}));

export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId,
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const postsTable = pgTable("posts", {
  id,
  createdAt,
  text: text("text"),
});
