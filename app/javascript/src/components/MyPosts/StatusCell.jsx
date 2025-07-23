import React from "react";

import { useUpdatePost } from "hooks/reactQuery/usePosts";
import { capitalize } from "neetocist";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Typography } from "neetoui";

const {
  MenuItem: { Button: MenuItemButton },
  Menu,
} = Dropdown;

const StatusCell = ({ status, slug }) => {
  const { mutate: updatePost, isLoading } = useUpdatePost();

  const updatePostStatus = status => {
    updatePost({
      slug,
      payload: {
        status,
      },
    });
  };

  return (
    <div className="flex items-center justify-between">
      <Typography>{capitalize(status)}</Typography>
      <Dropdown
        buttonStyle="text"
        disabled={isLoading}
        icon={MenuHorizontal}
        strategy="fixed"
      >
        <Menu>
          {status === "draft" ? (
            <MenuItemButton onClick={() => updatePostStatus("published")}>
              Publish
            </MenuItemButton>
          ) : (
            <MenuItemButton onClick={() => updatePostStatus("draft")}>
              Unpublish
            </MenuItemButton>
          )}
          <MenuItemButton style="danger">Delete</MenuItemButton>
        </Menu>
      </Dropdown>
    </div>
  );
};

export default StatusCell;
