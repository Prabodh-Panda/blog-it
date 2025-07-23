import React from "react";

import { capitalize } from "neetocist";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Typography } from "neetoui";

const {
  MenuItem: { Button: MenuItemButton },
  Menu,
} = Dropdown;

const StatusCell = status => {
  const handleUpdate = () => {};

  return (
    <div className="flex items-center justify-between">
      <Typography>{capitalize(status)}</Typography>
      <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
        <Menu>
          {status === "draft" ? (
            <MenuItemButton onClick={handleUpdate}>Publish</MenuItemButton>
          ) : (
            <MenuItemButton>Unpublish</MenuItemButton>
          )}
          <MenuItemButton style="danger">Delete</MenuItemButton>
        </Menu>
      </Dropdown>
    </div>
  );
};

export default StatusCell;
