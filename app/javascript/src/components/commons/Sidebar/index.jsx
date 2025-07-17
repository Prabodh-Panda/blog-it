import React from "react";

import SidebarItem from "components/commons/Sidebar/Item";
import { Book, Edit, ListDetails } from "neetoicons";
import { Avatar, Button } from "neetoui";
import routes from "routes";
import useCategoriesStore from "stores/useCategoriesStore";

const Sidebar = () => {
  const toggleIsCategoriesPaneOpen = useCategoriesStore(
    state => state.toggleIsCategoriesPaneOpen
  );

  return (
    <div className="flex flex-col items-center border-r p-4">
      <div className="space-y-4">
        <SidebarItem icon={<Book />} to={routes.posts.index} />
        <SidebarItem icon={<Edit />} to={routes.posts.new} />
        <Button
          className="flex w-full items-center justify-center"
          icon={ListDetails}
          style="text"
          onClick={toggleIsCategoriesPaneOpen}
        />
      </div>
      <Avatar className="mt-auto" size="large" />
    </div>
  );
};

export default Sidebar;
