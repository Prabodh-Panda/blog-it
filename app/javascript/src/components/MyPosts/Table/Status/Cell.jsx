import React from "react";

import { capitalize } from "neetocist";
import { MenuHorizontal } from "neetoicons";
import { Typography, Dropdown } from "neetoui";

import DeleteMenuItem from "./DeleteMenuItem";
import UpdateMenuItem from "./UpdateMenuItem";

const { Menu } = Dropdown;

const Cell = ({ status, slug }) => (
  <div className="flex items-center justify-between">
    <Typography>{capitalize(status)}</Typography>
    <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
      <Menu>
        <UpdateMenuItem {...{ status, slug }} />
        <DeleteMenuItem {...{ slug }} />
      </Menu>
    </Dropdown>
  </div>
);

export default Cell;
