"use client";
import React from "react";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { RiLogoutCircleLine } from "react-icons/ri";

export function LogoutButton() {
  return (
    <Link href="/api/auth/logout">
      <Button color="accent" className="w-full h-10 min-h-10">
        <RiLogoutCircleLine size={20} />
        <span>Logout</span>
      </Button>
    </Link>
  );
}
