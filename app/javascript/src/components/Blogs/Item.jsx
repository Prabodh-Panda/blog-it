import React from "react";

import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { getDateStringFromTimestamp } from "./utils";

const Item = ({ title, description, created_at, slug, author, categories }) => (
  <div className="my-4 border-b py-4">
    <div>
      <Link to={buildUrl(routes.blogs.show, { slug })}>
        <Typography
          className="cursor-pointer hover:underline"
          style="h2"
          weight="medium"
        >
          {title}
        </Typography>
      </Link>
      <div className="my-2 flex gap-2">
        {categories.map(category => (
          <Typography
            className="rounded-full bg-green-200 px-4"
            key={category.id}
          >
            {category.name}
          </Typography>
        ))}
      </div>
    </div>
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
