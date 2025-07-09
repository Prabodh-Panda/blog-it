import React from "react";

import { Typography } from "neetoui";

import { getDateStringFromTimestamp } from "./utils";

const Item = ({ title, description, created_at }) => (
  <div className="my-4 border-b py-4">
    <Typography style="h2" weight="medium">
      {title}
    </Typography>
    <Typography className="mt-2">{description}</Typography>
    <Typography className="mt-1" style="body3">
      {getDateStringFromTimestamp(created_at)}
    </Typography>
  </div>
);

export default Item;
