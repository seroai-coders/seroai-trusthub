import React from "react";
import NavButton from "./NavButton";

function Sidebar() {
  return (
    <ul>
      <li>
        <NavButton link="/case">Case Management</NavButton>
      </li>
      <li>
        <NavButton link="/userHistory">User History</NavButton>
      </li>
    </ul>
  );
}

export default Sidebar;
