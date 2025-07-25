import React from "react";

import SidebarItem from "components/commons/Sidebar/Item";

import { SIDEBAR_ITEMS } from "./constants";
import UserMenu from "./UserMenu";

const Sidebar = () => (
  <div className="flex flex-col items-center border-r p-4">
    <div className="space-y-4">
      {SIDEBAR_ITEMS.map(item => (
        <SidebarItem key={item.key} {...item} />
      ))}
    </div>
    <UserMenu />
  </div>
);

export default Sidebar;
