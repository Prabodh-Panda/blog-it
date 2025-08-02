import React from "react";

import { usePostVote } from "hooks/reactQuery/usePosts";
import { truncate } from "neetocist";
import { DownArrow, UpArrow } from "neetoicons";
import { Button, Tag, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
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
  netVotes,
  isBloggable,
  userVote,
}) => {
  const { t } = useTranslation();

  const { mutate: votePost } = usePostVote();

  const vote = vote_type => {
    votePost({
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
          <div className="flex items-center gap-4">
            <Link to={buildUrl(routes.posts.show, { slug })}>
              <Typography
                className="cursor-pointer hover:underline"
                style="h2"
                weight="medium"
              >
                {title}
              </Typography>
            </Link>
            {isBloggable && <Tag label={t("labels.blogIt")} style="success" />}
          </div>
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
      <div className="my-auto ml-auto flex flex-col items-center">
        <Button
          icon={UpArrow}
          size="large"
          style={userVote === "upvote" ? `primary` : "text"}
          onClick={() => vote("upvote")}
        />
        <Typography style="h3" weight="bold">
          {netVotes}
        </Typography>
        <Button
          icon={DownArrow}
          size="large"
          style={userVote === "downvote" ? `danger` : "text"}
          onClick={() => vote("downvote")}
        />
      </div>
    </div>
  );
};

export default Item;
