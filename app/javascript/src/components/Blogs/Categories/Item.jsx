import React from "react";

import classNames from "classnames";
import { Typography } from "neetoui";
import { includes, paths } from "ramda";
import useCategoriesStore from "stores/useCategoriesStore";
import { useShallow } from "zustand/react/shallow";

const Item = ({ id, name }) => {
  const [activeCategoryIds, toggleIdActiveState] = useCategoriesStore(
    useShallow(paths([["activeCategoryIds"], ["toggleIdActiveState"]]))
  );

  const active = includes(id, activeCategoryIds);

  return (
    <Typography
      className={classNames(
        "min-w-52 cursor-pointer rounded border border-gray-300 px-4 hover:bg-white",
        { "bg-white": active }
      )}
      onClick={() => toggleIdActiveState(id)}
    >
      {name}
    </Typography>
  );
};

export default Item;
