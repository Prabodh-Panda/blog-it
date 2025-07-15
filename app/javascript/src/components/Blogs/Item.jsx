import React from "react";

import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { getDateStringFromTimestamp } from "./utils";

const Item = ({ title, description, created_at, slug, author }) => (
  <div className="my-4 border-b py-4">
    <Link to={buildUrl(routes.blogs.show, { slug })}>
      <Typography
        className="cursor-pointer hover:underline"
        style="h2"
        weight="medium"
      >
        {title}
      </Typography>
    </Link>
    <Typography className="mt-2">{description}</Typography>
    <div className="mt-1">
      <Typography style="body3" weight="bold">
        {author.name}
      </Typography>
      <Typography style="body3">
        {getDateStringFromTimestamp(created_at)}
      </Typography>
    </div>
  </div>
);

export default Item;
