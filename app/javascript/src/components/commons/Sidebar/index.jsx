import React from "react";

import SidebarItem from "components/commons/Sidebar/Item";
import { Book, Edit } from "neetoicons";
import { Avatar } from "neetoui";
import routes from "routes";

const Sidebar = () => (
  <div className="flex flex-col items-center border-r p-4">
    <div className="space-y-4">
      <SidebarItem icon={<Book />} to={routes.blogs.index} />
      <SidebarItem icon={<Edit />} to={routes.blogs.new} />
    </div>
    <Avatar className="mt-auto" size="large" />
  </div>
);

export default Sidebar;
