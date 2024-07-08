import { relations, sql } from "drizzle-orm";
import {
  AnyPgColumn,
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const chatRoleEnum = pgEnum("chat_role", [
  "user",
  "admin",
  "moderator",
  "creator",
]);

export const id = serial("id").primaryKey();
export const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();

export const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const userId = integer("user_id")
  .notNull()
  .references(() => usersTable.id);

export const postId = integer("post_id")
  .notNull()
  .references(() => postsTable.id);

export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId,
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sessionsRelations = relations(sessionsTable, ({ many, one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));

export const usersTable = pgTable("users", {
  id,
  createdAt,
  username: varchar("username", { length: 256 })
    .notNull()
    .$defaultFn(() => sql`uuid_generate_v4()`),
  hashPassword: varchar("hash_password", { length: 256 }).notNull(),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  age: integer("age"),
  avatarId: integer("avatar_id").references(() => imagesTable.id),
  placeOfWork: varchar("place_of_work", { length: 256 }),
  city: varchar("city", { length: 256 }),
  isPrivateProfile: boolean("is_private_profile").notNull().default(false),
});

export const usersRelations = relations(usersTable, ({ many, one }) => ({
  sessions: many(sessionsTable),
  posts: many(postsTable),
  reactions: many(reactionsTable),
  comments: many(commentsTable),
  incomingFollows: many(followsTable, { relationName: "incoming_follows" }),
  outgoingFollows: many(followsTable, { relationName: "outgoing_follows" }),
  incomingFollowRequests: many(followRequestsTable, {
    relationName: "incoming_follow_requests",
  }),
  outgoingFollowRequests: many(followRequestsTable, {
    relationName: "outgoing_follow_requests",
  }),
  chats: many(chatsToUsersTable),
  messages: many(messagesTable),
  seenPosts: many(postsSeenTable),
  avatar: one(imagesTable, {
    fields: [usersTable.avatarId],
    references: [imagesTable.id],
  }),
}));

export const followsTable = pgTable("follows", {
  createdAt,
  sourceUserId: integer("source_user_id").references(() => usersTable.id),
  targetUserId: integer("target_user_id").references(() => usersTable.id),
});

export const followsRelations = relations(followsTable, ({ one }) => ({
  sourceUser: one(usersTable, {
    fields: [followsTable.sourceUserId],
    references: [usersTable.id],
    relationName: "outgoing_follows",
  }),
  targetUser: one(usersTable, {
    fields: [followsTable.targetUserId],
    references: [usersTable.id],
    relationName: "incoming_follows",
  }),
}));

export const followRequestsTable = pgTable("follow_requests", {
  sourceId: integer("source_user_id").references(() => usersTable.id),
  targetId: integer("target_user_id").references(() => usersTable.id),
});

export const followRequestsRelations = relations(
  followRequestsTable,
  ({ one }) => ({
    sourceUser: one(usersTable, {
      fields: [followRequestsTable.sourceId],
      references: [usersTable.id],
      relationName: "outgoing_follow_requests",
    }),
    targetUser: one(usersTable, {
      fields: [followRequestsTable.targetId],
      references: [usersTable.id],
      relationName: "incoming_follow_requests",
    }),
  })
);

export const postsTable = pgTable("posts", {
  id,
  createdAt,
  updatedAt,
  userId,
  isPublished: boolean("is_published").notNull().default(true),
  text: text("text"),
});

export const postsRelations = relations(postsTable, ({ many, one }) => ({
  images: many(imagesTable),
  reactions: many(reactionsTable),
  comments: many(commentsTable),
  user: one(usersTable, {
    fields: [postsTable.userId],
    references: [usersTable.id],
  }),
  seen: many(postsSeenTable),
  messagesReplies: many(messagesTable, { relationName: "messages-replies" }),
}));

export const postsSeenTable = pgTable("posts_seen", {
  postId: integer("post_id").references(() => postsTable.id),
  userId: integer("user_id").references(() => usersTable.id),
});

export const postsSeenRelations = relations(postsSeenTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [postsSeenTable.postId],
    references: [postsTable.id],
  }),
  user: one(usersTable, {
    fields: [postsSeenTable.userId],
    references: [usersTable.id],
  }),
}));

export const imagesTable = pgTable("images", {
  id,
  createdAt,
  postId: integer("post_id").references(() => postsTable.id),
  chatId: integer("chat_id").references(() => chatsTable.id),
  messageId: integer("message_id").references(() => messagesTable.id),
  url: varchar("url", { length: 256 }).notNull(),
});

export const imagesRelations = relations(imagesTable, ({ many, one }) => ({
  post: one(postsTable, {
    fields: [imagesTable.postId],
    references: [postsTable.id],
  }),
  message: one(messagesTable, {
    fields: [imagesTable.messageId],
    references: [messagesTable.id],
  }),
  usedAsAvatarBy: many(usersTable, { relationName: "used_as_avatar_by" }),
}));

export const reactionsTable = pgTable("reactions", {
  id,
  createdAt,
  userId,
  postId: integer("post_id").references(() => postsTable.id),
  commentId: integer("comment_id").references(() => commentsTable.id),
  messageId: integer("message_id").references(() => messagesTable.id),
});

export const reactionsRelations = relations(reactionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [reactionsTable.userId],
    references: [usersTable.id],
  }),
  post: one(postsTable, {
    fields: [reactionsTable.postId],
    references: [postsTable.id],
  }),
  comment: one(commentsTable, {
    fields: [reactionsTable.commentId],
    references: [commentsTable.id],
  }),
  message: one(messagesTable, {
    fields: [reactionsTable.messageId],
    references: [messagesTable.id],
  }),
}));

export const commentsTable = pgTable("comments", {
  id,
  createdAt,
  updatedAt,
  postId,
  userId,
  replieToId: integer("replie_to_id").references(
    (): AnyPgColumn => commentsTable.id
  ),
  text: text("text").notNull(),
});

export const commentsRelations = relations(commentsTable, ({ many, one }) => ({
  user: one(usersTable, {
    fields: [commentsTable.userId],
    references: [usersTable.id],
  }),
  post: one(postsTable, {
    fields: [commentsTable.postId],
    references: [postsTable.id],
  }),
  reactions: many(reactionsTable),
  replies: many(commentsTable, { relationName: "replies" }),
  replieTo: one(commentsTable, {
    fields: [commentsTable.replieToId],
    references: [commentsTable.id],
    relationName: "replie-to",
  }),
}));

export const chatsTable = pgTable("chats", {
  id,
  createdAt,
});

export const chatsRelations = relations(chatsTable, ({ many }) => ({
  messages: many(messagesTable),
  users: many(chatsToUsersTable),
  images: many(imagesTable),
}));

export const chatsToUsersTable = pgTable("chats_to_users", {
  chatId: integer("chat_id").references(() => chatsTable.id),
  userId: integer("user_id").references(() => usersTable.id),
  role: chatRoleEnum("role").notNull(),
});

export const chatsToUsersRelations = relations(
  chatsToUsersTable,
  ({ one }) => ({
    chat: one(chatsTable, {
      fields: [chatsToUsersTable.chatId],
      references: [chatsTable.id],
    }),
    user: one(usersTable, {
      fields: [chatsToUsersTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const messagesTable = pgTable("messages", {
  id,
  createdAt,
  updatedAt,
  userId,
  chatId: integer("chat_id")
    .notNull()
    .references(() => chatsTable.id),
  postId: integer("post_id").references(() => postsTable.id),
  replieToId: integer("replie_to_id").references(
    (): AnyPgColumn => messagesTable.id
  ),
  text: text("text"),
});

export const messagesRelations = relations(messagesTable, ({ many, one }) => ({
  user: one(usersTable, {
    fields: [messagesTable.userId],
    references: [usersTable.id],
  }),
  chat: one(chatsTable, {
    fields: [messagesTable.chatId],
    references: [chatsTable.id],
  }),
  post: one(postsTable, {
    fields: [messagesTable.postId],
    references: [postsTable.id],
  }),
  images: many(imagesTable),
  reactions: many(reactionsTable),
  replies: many(messagesTable, { relationName: "replies" }),
  replieTo: one(messagesTable, {
    fields: [messagesTable.replieToId],
    references: [messagesTable.id],
    relationName: "replie-to",
  }),
}));
