import React from "react";

import { ActionDropdown, Button } from "neetoui";
import routes from "routes";
import withT from "utils/withT";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = ActionDropdown;

const ActionBlock = ({ t, status, setStatus, onClick, disabled }) => (
  <>
    <Button style="secondary" to={routes.posts.index} {...{ disabled }}>
      {t("labels.cancel")}
    </Button>
    <ActionDropdown
      label={status === "published" ? "Publish" : "Save as draft"}
      {...{ onClick }}
    >
      <Menu>
        <MenuItemButton onClick={() => setStatus("published")}>
          Publish
        </MenuItemButton>
        <MenuItemButton onClick={() => setStatus("draft")}>
          Save as draft
        </MenuItemButton>
      </Menu>
    </ActionDropdown>
  </>
);

export default withT(ActionBlock);
