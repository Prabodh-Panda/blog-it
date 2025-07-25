import React, { useState } from "react";

import { useDestroyPost } from "hooks/reactQuery/usePosts";
import { capitalize } from "neetocist";
import { MenuHorizontal } from "neetoicons";
import { Typography, Dropdown, Alert } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

import DeleteMenuItem from "./DeleteMenuItem";
import UpdateMenuItem from "./UpdateMenuItem";

const { Menu } = Dropdown;

const Cell = ({ status, slug, title }) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { t } = useTranslation();

  const { mutate: destroyPost } = useDestroyPost();

  const handleDeletePost = () => {
    destroyPost({ slug, quiet: true });
  };

  return (
    <div className="flex items-center justify-between">
      <Typography>{capitalize(status)}</Typography>
      <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
        <Menu>
          <UpdateMenuItem {...{ status, slug }} />
          <DeleteMenuItem onClick={() => setIsDeleteAlertOpen(true)} />
        </Menu>
      </Dropdown>
      <Alert
        isOpen={isDeleteAlertOpen}
        submitButtonLabel={t("labels.delete")}
        title={t("titles.deletePost")}
        message={
          <Trans
            shouldUnescape
            components={{ strong: <strong /> }}
            i18nKey="messages.deletePost"
            values={{ title }}
          />
        }
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={() => {
          handleDeletePost();
          setIsDeleteAlertOpen(false);
        }}
      />
    </div>
  );
};

export default Cell;
