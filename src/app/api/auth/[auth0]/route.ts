import prisma from "@/lib/prisma";
import {
  AfterCallback,
  Session,
  handleAuth,
  handleCallback,
} from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

const afterCallback: AfterCallback = async (
  _: NextRequest,
  session: Session
) => {
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });

  if (user) {
    session.user.id = user?.id;
    session.user.role = user?.role;
  } else {
    const newUser = await prisma.user.create({
      data: { name: session.user.name, email: session.user.email },
    });

    session.user.id = newUser.id;
    session.user.role = newUser.role;
  }

  return session;
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
});
