import React from "react";

import { Tag, Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { getDateStringFromTimestamp } from "./utils";

const Item = ({ title, description, createdAt, slug, author, categories }) => (
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
        {categories.map(({ name, id }) => (
          <Tag key={id} label={name} style="success" type="solid" />
        ))}
      </div>
    </div>
    <Typography className="mt-2">{description}</Typography>
    <div className="mt-1">
      <Typography style="body3" weight="bold">
        {author.name}
      </Typography>
      <Typography style="body3">
        {getDateStringFromTimestamp(createdAt)}
      </Typography>
    </div>
  </div>
);

export default Item;
