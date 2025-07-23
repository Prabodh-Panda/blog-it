import React, { useRef } from "react";

import SidebarItem from "components/commons/Sidebar/Item";
import { useLogout } from "hooks/reactQuery/useAuth";
import { Book, Edit, LeftArrow, List, ListDetails } from "neetoicons";
import { Avatar, Button, Popover, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useCategoriesStore from "stores/useCategoriesStore";
import { getFromLocalStorage } from "utils/storage";

const Sidebar = () => {
  const { t } = useTranslation();

  const toggleIsCategoriesPaneOpen = useCategoriesStore(
    state => state.toggleIsCategoriesPaneOpen
  );

  const { mutate: logout } = useLogout();
  const history = useHistory();

  const name = getFromLocalStorage("authUserName");
  const email = getFromLocalStorage("authEmail");

  const avatarRef = useRef();

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        history.replace(routes.auth.login);
      },
    });
  };

  return (
    <div className="flex flex-col items-center border-r p-4">
      <div className="space-y-4">
        <SidebarItem
          icon={<Book />}
          to={routes.posts.index}
          tooltipText="Blog Posts"
        />
        <SidebarItem
          icon={<Edit />}
          to={routes.posts.new}
          tooltipText="New Blog Post"
        />
        <SidebarItem
          icon={<List />}
          to={routes.myPosts.index}
          tooltipText="My Blog Posts"
        />
        <Button
          className="flex w-full items-center justify-center"
          icon={ListDetails}
          style="text"
          tooltipProps={{ content: "Categories" }}
          onClick={toggleIsCategoriesPaneOpen}
        />
      </div>
      <div className="mt-auto" ref={avatarRef}>
        <Avatar size="large" user={{ name }} />
      </div>
      <Popover reference={avatarRef}>
        <div className="mb-4 flex items-center gap-2 border-b pb-4">
          <Avatar size="large" user={{ name }} />
          <div>
            <Typography style="body2" weight="bold">
              {name}
            </Typography>
            <Typography style="body3">{email}</Typography>
          </div>
        </div>
        <Button
          icon={LeftArrow}
          iconPosition="left"
          style="text"
          onClick={handleLogout}
        >
          {t("labels.logout")}
        </Button>
      </Popover>
    </div>
  );
};

export default Sidebar;
