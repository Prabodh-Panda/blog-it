import React, { useEffect } from "react";

import classNames from "classnames";
import { PageLoader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategories";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull, isNotEqualDeep } from "neetocist";
import { Plus, Search } from "neetoicons";
import { Button, Modal, Typography } from "neetoui";
import { mergeLeft, paths } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useCategoriesStore from "stores/useCategoriesStore";
import { buildUrl } from "utils/url";
import { useShallow } from "zustand/react/shallow";

import CategoryItem from "./Item";
import NewCategory from "./New";

const Categories = () => {
  const queryParams = useQueryParams();
  const { categories: categorySlugs } = queryParams;

  const history = useHistory();

  const [
    activeCategorySlugs,
    isCategoriesPaneOpen,
    setIsCategoriesPaneOpen,
    isNewCategoryModalOpen,
    setIsNewCategoryModalOpen,
    setActiveCategorySlugs,
  ] = useCategoriesStore(
    useShallow(
      paths([
        ["activeCategorySlugs"],
        ["isCategoriesPaneOpen"],
        ["setIsCategoriesPaneOpen"],
        ["isNewCategoryModalOpen"],
        ["setIsNewCategoryModalOpen"],
        ["setActiveCategorySlugs"],
      ])
    )
  );

  const { t } = useTranslation();

  const {
    data: { categories },
    isLoading,
  } = useFetchCategories();

  useEffect(() => {
    if (categorySlugs && isNotEqualDeep(activeCategorySlugs, categorySlugs)) {
      setActiveCategorySlugs(categorySlugs);
      setIsCategoriesPaneOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!categorySlugs || isNotEqualDeep(activeCategorySlugs, categorySlugs)) {
      const updatedParams = filterNonNull(
        mergeLeft({ categories: activeCategorySlugs }, queryParams)
      );

      history.replace(buildUrl(routes.blogs.index, updatedParams));
    }
  }, [activeCategorySlugs, categorySlugs]);

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
          <CategoryItem key={category.id} {...category} />
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
