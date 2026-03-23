import { db } from "../db/index";
import { usersTable } from "../db/schema/users";
import { generateUsername } from "../lib/username";
import { eq, or } from "drizzle-orm";

export const addUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const passwordHash = await Bun.password.hash(password);
  const username = generateUsername(name);

  const [newUser] = await db
    .insert(usersTable)
    .values({ name, email, password_hash: passwordHash, username })
    .returning({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      username: usersTable.username,
    });

  return newUser;
};

export const loginUser = async (
  identifier: string,
  passwordString: string,
) => {
  // Find by email or username
  const [user] = await db
    .select()
    .from(usersTable)
    .where(
      or(
        eq(usersTable.email, identifier.toLowerCase()),
        eq(usersTable.username, identifier.toLowerCase())
      )
    )
    .limit(1);

  if (!user) {
    return null;
  }

  // Verify the password
  const isValidPassword = await Bun.password.verify(
    passwordString,
    user.password_hash,
  );

  if (!isValidPassword) {
    return null;
  }

  // Return user without password_hash
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
  };
};

export const requestPasswordReset = async (email: string) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase()))
    .limit(1);

  if (!user) {
    // Return early to prevent email enumeration
    return;
  }

  // Generate a cryptographically secure 32-byte hex token
  const token = Bun.randomUUIDv7() + Bun.randomUUIDv7();

  // Expires in 5 minutes
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // Update user record
  await db
    .update(usersTable)
    .set({
      reset_password_token: token,
      reset_password_expires_at: expiresAt,
    })
    .where(eq(usersTable.id, user.id));

  // Note: you need to import this at the top:
  // import { sendPasswordResetEmail } from "../lib/email";
  const { sendPasswordResetEmail } = await import("../lib/email");
  await sendPasswordResetEmail(user.email, token);
};

export const resetPassword = async (token: string, newPasswordString: string) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.reset_password_token, token))
    .limit(1);

  if (!user || !user.reset_password_expires_at) {
    return false; // Invalid token
  }

  // Check if token is expired
  if (new Date() > user.reset_password_expires_at) {
    return false; // Expired token
  }

  // Hash new password
  const newPasswordHash = await Bun.password.hash(newPasswordString);

  // Update password and clear reset fields
  await db
    .update(usersTable)
    .set({
      password_hash: newPasswordHash,
      reset_password_token: null,
      reset_password_expires_at: null,
    })
    .where(eq(usersTable.id, user.id));

  return true;
};
