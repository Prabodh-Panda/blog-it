import React from "react";

import { PageLoader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategories";
import useQueryParams from "hooks/useQueryParams";
import { capitalize, filterNonNull } from "neetocist";
import { Tag } from "neetoui";
import { mergeLeft, of, unless, without } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { getSelectedCategoriesFromSlugs } from "./utils";

const ActiveFilterDisplay = () => {
  const { data: allCategories, isLoading } = useFetchCategories();

  const queryParams = useQueryParams();
  const { status, categories } = queryParams;

  const history = useHistory();

  if (isLoading) return <PageLoader />;

  const selectedCategories = getSelectedCategoriesFromSlugs(
    categories,
    allCategories
  );

  const handleClose = slug => {
    const categoriesArray = unless(Array.isArray, of)(categories);

    const updatedParams = filterNonNull(
      mergeLeft({ categories: without([slug], categoriesArray) }, queryParams)
    );

    history.replace(buildUrl(routes.myPosts.index, updatedParams));
  };

  const clearStatusFilter = () => {
    const updatedParams = filterNonNull(
      mergeLeft({ status: null }, queryParams)
    );

    history.replace(buildUrl(routes.myPosts.index, updatedParams));
  };

  const isDraft = status === "draft";

  return (
    <div className="flex items-center gap-2">
      {selectedCategories &&
        selectedCategories.map(({ slug, name }) => (
          <Tag
            key={slug}
            label={name}
            style="secondary"
            onClose={() => handleClose(slug)}
          />
        ))}
      {status && (
        <Tag style={isDraft ? "danger" : "success"} onClose={clearStatusFilter}>
          {capitalize(status)}
        </Tag>
      )}
    </div>
  );
};

export default ActiveFilterDisplay;
