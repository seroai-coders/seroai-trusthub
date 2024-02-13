import React from "react";

import { getSession } from "@auth0/nextjs-auth0";

export const UserInfo = async () => {
  const session = await getSession();

  return <span>{session?.user?.name}</span>;
};
