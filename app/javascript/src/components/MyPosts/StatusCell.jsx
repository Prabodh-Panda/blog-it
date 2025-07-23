import React from "react";

import { useDestroyPost, useUpdatePost } from "hooks/reactQuery/usePosts";
import { capitalize } from "neetocist";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Typography } from "neetoui";

const {
  MenuItem: { Button: MenuItemButton },
  Menu,
} = Dropdown;

const StatusCell = ({ status, slug }) => {
  const { mutate: updatePost, isLoading: isUpdatePostLoading } =
    useUpdatePost();

  const { mutate: destroyPost, isLoading: isDestroyPostLoading } =
    useDestroyPost();

  const isLoading = isUpdatePostLoading || isDestroyPostLoading;

  const updatePostStatus = status => {
    updatePost({
      slug,
      payload: {
        status,
      },
      quiet: true,
    });
  };

  const handleDeletePost = () => {
    destroyPost({ slug, quiet: true });
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
          <MenuItemButton style="danger" onClick={handleDeletePost}>
            Delete
          </MenuItemButton>
        </Menu>
      </Dropdown>
    </div>
  );
};

export default StatusCell;
