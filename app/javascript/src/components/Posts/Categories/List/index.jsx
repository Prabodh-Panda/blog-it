import React from "react";

import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import CategoryListItem from "./Item";

import { getFilteredCategories } from "../utils";

const List = ({ categories, searchValue }) => {
  const { t } = useTranslation();
  const filteredCategories = getFilteredCategories(categories, searchValue);

  if (isEmpty(filteredCategories)) {
    return (
      <NoData
        className="mt-4 w-full text-center"
        title={t("errors.noCategoriesFound")}
      />
    );
  }

  return (
    <div className="my-4 space-y-2">
      {filteredCategories.map(category => (
        <CategoryListItem key={category.id} {...category} />
      ))}
    </div>
  );
};

export default List;
