import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export async function getCurrentSession() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth");
  }

  return session;
}
