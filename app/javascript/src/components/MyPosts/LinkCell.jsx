import React from "react";

import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

const LinkCell = (title, { slug }) => (
  <Link to={buildUrl(routes.posts.edit, { slug })}>
    <Typography>{title}</Typography>
  </Link>
);

export default LinkCell;
