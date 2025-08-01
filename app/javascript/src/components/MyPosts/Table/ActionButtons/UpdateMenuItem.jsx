import React from "react";

import { useUpdatePost } from "hooks/reactQuery/usePosts";
import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

const {
  MenuItem: { Button: MenuItemButton },
} = Dropdown;

const UpdateMenuItem = ({ status, slug }) => {
  const { t } = useTranslation();

  const { mutate: updatePost, isLoading } = useUpdatePost();

  const isDraft = status === "draft";

  const handleUpdatePost = () => {
    updatePost({
      slug,
      payload: {
        status: isDraft ? "published" : "draft",
      },
      quiet: true,
    });
  };

  return (
    <MenuItemButton
      disabled={isLoading}
      style="text"
      onClick={handleUpdatePost}
    >
      {isDraft ? t("labels.publish") : t("labels.unpublish")}
    </MenuItemButton>
  );
};

export default UpdateMenuItem;
