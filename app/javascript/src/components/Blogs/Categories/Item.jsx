import React from "react";

import classNames from "classnames";
import { Typography } from "neetoui";
import { includes, paths } from "ramda";
import useCategoriesStore from "stores/useCategoriesStore";
import { useShallow } from "zustand/react/shallow";

const Item = ({ slug, name }) => {
  const [activeCategorySlugs, toggleSlugActiveState] = useCategoriesStore(
    useShallow(paths([["activeCategorySlugs"], ["toggleSlugActiveState"]]))
  );

  const active = includes(slug, activeCategorySlugs);

  return (
    <Typography
      className={classNames(
        "min-w-52 cursor-pointer rounded border border-gray-300 px-4 hover:bg-white",
        { "bg-white": active }
      )}
      onClick={() => toggleSlugActiveState(slug)}
    >
      {name}
    </Typography>
  );
};

export default Item;
