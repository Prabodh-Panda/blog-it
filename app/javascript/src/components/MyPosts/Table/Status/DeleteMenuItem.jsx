import React from "react";

import { useDestroyPost } from "hooks/reactQuery/usePosts";
import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

const {
  MenuItem: { Button: MenuItemButton },
} = Dropdown;

const DeleteMenuItem = ({ slug }) => {
  const { t } = useTranslation();

  const { mutate: destroyPost, isLoading } = useDestroyPost();

  const handleDeletePost = () => {
    destroyPost({ slug, quiet: true });
  };

  return (
    <MenuItemButton
      disabled={isLoading}
      style="danger"
      onClick={handleDeletePost}
    >
      {t("labels.delete")}
    </MenuItemButton>
  );
};

export default DeleteMenuItem;
