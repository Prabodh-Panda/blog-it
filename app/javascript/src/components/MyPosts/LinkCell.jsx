import React from "react";

import { truncate } from "neetocist";
import { Button, Typography } from "neetoui";
import routes from "routes";
import { buildUrl } from "utils/url";

const LinkCell = (title, { slug }) => (
  <Button
    className="block"
    style="link"
    to={buildUrl(routes.posts.edit, { slug })}
    tooltipProps={{
      content: title,
      position: "top",
      followCursor: "horizontal",
    }}
  >
    <Typography>{truncate(title, 50)}</Typography>
  </Button>
);

export default LinkCell;
