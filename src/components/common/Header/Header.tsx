"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/ui/Loader";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UserInfo } from "./UserInfo";

const Sidebar = dynamic(() => import("./Sidebar"), {
  loading: () => <Loader />,
});

function Header() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <>
      <header className="fixed top-0 z-50 flex h-header w-full shrink-0 items-center justify-between bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-lg">
        <Sidebar />
        {isLoading ? (
          <div className="w-16 h-4 skeleton"></div>
        ) : (
          <UserInfo user={user} />
        )}
      </header>
      <div className="h-header" />
    </>
  );
}

export default Header;
