import React, { useEffect } from "react";

import classNames from "classnames";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull, isNotEmpty } from "neetocist";
import { Typography } from "neetoui";
import { append, includes, mergeLeft, without } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useCategoriesStore from "stores/useCategoriesStore";
import { buildUrl } from "utils/url";

const Item = ({ slug, name }) => {
  const queryParams = useQueryParams();
  const { categories = [] } = queryParams;

  const setIsCategoriesPaneOpen = useCategoriesStore(
    state => state.setIsCategoriesPaneOpen
  );

  const history = useHistory();

  const active = includes(slug, categories);

  const handleClick = () => {
    let updatedCategories = [];
    if (active) {
      updatedCategories = without([slug], categories);
    } else {
      updatedCategories = append(slug, categories);
    }

    const updatedParams = filterNonNull(
      mergeLeft({ categories: updatedCategories }, queryParams)
    );

    history.replace(buildUrl(routes.blogs.index, updatedParams));
  };

  useEffect(() => {
    if (isNotEmpty(categories)) setIsCategoriesPaneOpen(true);
  }, []);

  return (
    <Typography
      className={classNames(
        "min-w-52 cursor-pointer rounded border border-gray-300 px-4 hover:bg-white",
        { "bg-white": active }
      )}
      onClick={handleClick}
    >
      {name}
    </Typography>
  );
};

export default Item;
