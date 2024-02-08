import React from "react";

import { UserProfile } from "@auth0/nextjs-auth0/client";

export const UserInfo = ({ user }: { user?: UserProfile }) => (
  <span>{user?.name}</span>
);
