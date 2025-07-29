import React from "react";

import { Dropdown } from "neetoui";
import withT from "utils/withT";

const {
  MenuItem: { Button: MenuItemButton },
} = Dropdown;

const DeleteMenuItem = ({ t, onClick }) => (
  <MenuItemButton style="danger" {...{ onClick }}>
    {t("labels.delete")}
  </MenuItemButton>
);

export default withT(DeleteMenuItem);
