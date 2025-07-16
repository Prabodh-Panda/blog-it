import React from "react";

import classNames from "classnames";
import { PageLoader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategories";
import { Plus, Search } from "neetoicons";
import { Button, Modal, Typography } from "neetoui";
import { paths } from "ramda";
import { useTranslation } from "react-i18next";
import useCategoriesStore from "stores/useCategoriesStore";
import { useShallow } from "zustand/react/shallow";

import NewCategory from "./New";

const Categories = () => {
  const [
    isCategoriesPaneOpen,
    isNewCategoryModalOpen,
    setIsNewCategoryModalOpen,
  ] = useCategoriesStore(
    useShallow(
      paths([
        ["isCategoriesPaneOpen"],
        ["isNewCategoryModalOpen"],
        ["setIsNewCategoryModalOpen"],
      ])
    )
  );

  const { t } = useTranslation();

  const {
    data: { categories },
    isLoading,
  } = useFetchCategories();

  if (isLoading) return <PageLoader />;

  return (
    <div
      className={classNames("bg-gray-200 p-4", {
        hidden: !isCategoriesPaneOpen,
      })}
    >
      <div className="flex items-center justify-between">
        <Typography style="h4" weight="bold">
          {t("titles.categories")}
        </Typography>
        <div>
          <Button
            className="text-black"
            icon={Plus}
            style="link"
            onClick={() => setIsNewCategoryModalOpen(true)}
          />
          <Button className="text-black" icon={Search} style="link" />
        </div>
      </div>
      <div className="my-4 space-y-2">
        {categories.map(category => (
          <Typography
            className="min-w-52 cursor-pointer rounded border border-gray-300 px-4 hover:bg-white"
            key={category.id}
          >
            {category.name}
          </Typography>
        ))}
      </div>
      <Modal
        isOpen={isNewCategoryModalOpen}
        onClose={() => setIsNewCategoryModalOpen(false)}
      >
        <NewCategory />
      </Modal>
    </div>
  );
};

export default Categories;
