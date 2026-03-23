import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "./_helpers";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  username: varchar().notNull().unique(),
  password_hash: varchar().notNull(),
  reset_password_token: varchar(),
  reset_password_expires_at: timestamp(),
  ...timestamps,
});
