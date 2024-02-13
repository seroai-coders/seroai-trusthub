import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/ui/Loader";
import { UserInfo } from "./UserInfo";

const Sidebar = dynamic(() => import("./Sidebar"), {
  loading: () => <Loader />,
});

async function Header() {
  return (
    <>
      <header className="fixed top-0 z-50 flex h-header w-full shrink-0 items-center justify-between bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-lg">
        <Sidebar />
        <Suspense fallback={<div className="w-16 h-4 skeleton" />}>
          <UserInfo />
        </Suspense>
      </header>
      <div className="h-header" />
    </>
  );
}

export default Header;
