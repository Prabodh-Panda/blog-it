import React, { useState } from "react";

import { DeletePostAlert } from "components/commons";
import { useDestroyPost } from "hooks/reactQuery/usePosts";
import { ExternalLink, MenuHorizontal } from "neetoicons";
import { ActionDropdown, Button, Dropdown } from "neetoui";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";
import withT from "utils/withT";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = ActionDropdown;

const ActionBlock = ({
  t,
  slug,
  title,
  status,
  setStatus,
  onClick,
  disabled,
  shouldShowPreviewButton = false,
  shouldShowDeleteButton = false,
}) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState();

  const history = useHistory();

  const { mutate: destroyPost, isLoading } = useDestroyPost();

  const handleDelete = () => {
    destroyPost(
      { slug },
      { onSuccess: () => history.push(routes.posts.index) }
    );
  };

  return (
    <div className="ml-auto mt-auto flex items-center space-x-2">
      {shouldShowPreviewButton && (
        <Button
          icon={ExternalLink}
          style="text"
          to={buildUrl(routes.posts.show, { slug })}
        />
      )}
      <Button style="secondary" to={routes.posts.index} {...{ disabled }}>
        {t("labels.cancel")}
      </Button>
      <ActionDropdown
        label={
          status === "published" ? t("labels.publish") : t("labels.saveAsDraft")
        }
        {...{ onClick, disabled }}
      >
        <Menu>
          <MenuItemButton onClick={() => setStatus("published")}>
            {t("labels.publish")}
          </MenuItemButton>
          <MenuItemButton onClick={() => setStatus("draft")}>
            {t("labels.saveAsDraft")}
          </MenuItemButton>
        </Menu>
      </ActionDropdown>
      {shouldShowDeleteButton && (
        <>
          <Dropdown
            buttonStyle="text"
            icon={MenuHorizontal}
            strategy="fixed"
            {...{ disabled: disabled || isLoading }}
          >
            <Menu>
              <MenuItemButton
                style="danger"
                onClick={() => setIsDeleteAlertOpen(true)}
              >
                {t("labels.delete")}
              </MenuItemButton>
            </Menu>
          </Dropdown>
          <DeletePostAlert
            isOpen={isDeleteAlertOpen}
            setIsOpen={setIsDeleteAlertOpen}
            title={title}
            onSubmit={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default withT(ActionBlock);
