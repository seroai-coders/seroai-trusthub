import React from "react";

import { UserProfile } from "@auth0/nextjs-auth0/client";

export function UserInfo({ user }: { user: UserProfile }) {
  return <span>{user.name}</span>;
}
