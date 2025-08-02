import React from "react";

import postsApi from "apis/posts";
import { truncate } from "neetocist";
import { DownArrow, UpArrow } from "neetoicons";
import { Button, Tag, Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { getDateStringFromTimestamp } from "../utils";

const Item = ({
  title,
  description,
  lastPublishedAt,
  slug,
  author,
  categories,
}) => {
  const vote = vote_type => {
    postsApi.vote({
      slug,
      payload: {
        vote_type,
      },
    });
  };

  return (
    <div className="my-4 flex border-b py-4">
      <div>
        <div>
          <Link to={buildUrl(routes.posts.show, { slug })}>
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
        <Typography className="mt-2">{truncate(description, 400)}</Typography>
        <div className="mt-1">
          <Typography style="body3" weight="bold">
            {author.name}
          </Typography>
          <Typography style="body3">
            {getDateStringFromTimestamp(lastPublishedAt)}
          </Typography>
        </div>
      </div>
      <div className="my-auto ml-4 flex flex-col items-center">
        <Button
          icon={UpArrow}
          size="large"
          style="text"
          onClick={() => vote("upvote")}
        />
        <Typography style="h3" weight="bold">
          0
        </Typography>
        <Button
          icon={DownArrow}
          size="large"
          style="text"
          onClick={() => vote("downvote")}
        />
      </div>
    </div>
  );
};

export default Item;
