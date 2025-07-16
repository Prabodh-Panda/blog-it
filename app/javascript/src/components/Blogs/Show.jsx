import React from "react";

import { Header, PageLoader } from "components/commons";
import PageNotFound from "components/commons/PageNotFound";
import { useShowPost } from "hooks/reactQuery/usePosts";
import { Avatar, Tag, Typography } from "neetoui";
import { useParams } from "react-router-dom";

import { getDateStringFromTimestamp } from "./utils";

const Show = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useShowPost(slug);

  if (isLoading) return <PageLoader />;

  if (!post) return <PageNotFound />;

  const {
    title,
    description,
    author: { name },
    created_at,
    categories,
  } = post;

  return (
    <div>
      <Header
        title={title}
        preHeaderContent={
          <div className="mb-2 space-x-2">
            {categories.map(({ name, id }) => (
              <Tag key={id} label={name} style="success" type="solid" />
            ))}
          </div>
        }
      />
      <div className="px-16 pb-4">
        <div className="mb-8 flex items-center gap-4">
          <Avatar size="large" />
          <div>
            <Typography style="body2" weight="medium">
              {name}
            </Typography>
            <Typography style="body3">
              {getDateStringFromTimestamp(created_at)}
            </Typography>
          </div>
        </div>
        <Typography>{description}</Typography>
      </div>
    </div>
  );
};

export default Show;
