import { enhance } from "@zenstackhq/runtime";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@auth0/nextjs-auth0";

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

export async function SecurePrisma() {
  const session = await getSession();

  const contextUser = session?.user
    ? { id: session?.user.id, role: session?.user.role }
    : undefined;
  return enhance(prisma, { user: contextUser });
}

export default prisma;
