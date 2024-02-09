import { enhance } from "@zenstackhq/runtime";
import prisma from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequestHandler } from "@zenstackhq/server/next";

async function getPrisma() {
  const session = await getSession();
  const uid = session?.user.id;
  const contextUser = uid
    ? { id: session?.user.id, role: session?.user.role }
    : undefined;
  return enhance(prisma, { user: contextUser });
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true });

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
