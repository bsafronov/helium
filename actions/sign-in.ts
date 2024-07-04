"use server";

import { db } from "@/lib/db";
import { usersTable } from "@/schema";
import { SignInSchema } from "@/schema/sign-in";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export const signIn = async ({ password, username }: SignInSchema) => {
  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, username),
  });

  if (!existingUser) {
    throw new Error("Имя или пароль неверны");
  }

  const isValidPassword = await bcrypt.compare(
    password,
    existingUser.hashPassword
  );

  if (!isValidPassword) {
    throw new Error("Имя или пароль неверны");
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
