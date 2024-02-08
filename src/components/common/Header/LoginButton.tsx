"use client";
import React from "react";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { RiLoginCircleLine } from "react-icons/ri";

export function LoginButton() {
  return (
    <Link href="/api/auth/login">
      <Button variant="secondary" color="accent" className="h-10 min-h-10">
        <RiLoginCircleLine size={20} />
        <span className="text-base-content">Login</span>
      </Button>
    </Link>
  );
}
