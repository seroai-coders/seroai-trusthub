import React from "react";
import NavButton from "./NavButton";
import { LogoutButton } from "./LogoutButton";
import { HiMiniBars3 } from "react-icons/hi2";

function SidebarContent() {
  return (
    <>
      <ul>
        <li>
          <NavButton link="/case">Case Management</NavButton>
        </li>
        <li>
          <NavButton link="/userHistory">User History</NavButton>
        </li>
      </ul>
      <div className="divider" />
      <LogoutButton />
    </>
  );
}

function Sidebar() {
  return (
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
          <SidebarContent />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
