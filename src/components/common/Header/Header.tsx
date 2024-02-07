import React from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import dynamic from "next/dynamic";
import Loader from "@/components/ui/Loader";

const Sidebar = dynamic(() => import("./Sidebar"), {
  loading: () => <Loader />,
});

function Header() {
  return (
    <>
      <header className="fixed top-0 z-50 flex h-header w-full shrink-0 items-center justify-between bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-lg">
        <div className="drawer w-16">
          <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              id="nav-content"
              htmlFor="nav-drawer"
              className="btn btn-square btn-ghost drawer-button"
            >
              <HiMiniBars3 size={20} />
            </label>
          </div>
          <div className="drawer-side">
            <label
              id="nav-side"
              htmlFor="nav-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="p-6 flex flex-1 flex-col items-stretch justify-start h-screen w-80 bg-base-200 text-base-content">
              <Sidebar />
            </div>
          </div>
        </div>
      </header>
      <div className="h-header" />
    </>
  );
}

export default Header;
