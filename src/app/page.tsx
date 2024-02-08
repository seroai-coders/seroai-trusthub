import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Page() {
  const session = await getSession();

  return session ? redirect("/case") : redirect("/api/auth/login");
}
