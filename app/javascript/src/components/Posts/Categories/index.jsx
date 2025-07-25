import React, { useState } from "react";

import classNames from "classnames";
import { PageLoader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategories";
import { Plus, Search } from "neetoicons";
import { Button, Modal, Typography } from "neetoui";
import { paths } from "ramda";
import { useTranslation } from "react-i18next";
import useCategoriesStore from "stores/useCategoriesStore";
import { useShallow } from "zustand/react/shallow";

import CategoriesList from "./List";
import NewCategory from "./New";
import CategorySearch from "./Search";

const Categories = () => {
  const [isSearchInputShown, setIsSearchInputShown] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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

  const { data: categories = [], isLoading } = useFetchCategories();

  if (isLoading) return <PageLoader />;

  return (
    <div
      className={classNames("min-w-80 bg-gray-200 p-4", {
        hidden: !isCategoriesPaneOpen,
      })}
    >
      <div className="flex items-center justify-between">
        <Typography className="uppercase" style="h4" weight="bold">
          {t("titles.categories")}
        </Typography>
        <div>
          <Button
            className="text-black"
            icon={Plus}
            style="link"
            onClick={() => setIsNewCategoryModalOpen(true)}
          />
          <Button
            className="text-black"
            icon={Search}
            style="link"
            onClick={() => setIsSearchInputShown(open => !open)}
          />
        </div>
      </div>
      <CategorySearch
        isOpen={isSearchInputShown}
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
      />
      <CategoriesList {...{ searchValue, categories }} />
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
