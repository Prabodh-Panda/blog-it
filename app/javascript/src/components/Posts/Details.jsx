import React from "react";

import { Header, PageLoader, Sidebar } from "components/commons";
import PageNotFound from "components/commons/PageNotFound";
import { useShowPost } from "hooks/reactQuery/usePosts";
import { Highlight } from "neetoicons";
import { Avatar, Button, Tag, Typography } from "neetoui";
import { useParams } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { getDateStringFromTimestamp } from "./utils";

const Details = () => {
  const { slug } = useParams();
  const { data: { post } = {}, isLoading } = useShowPost(slug);

  if (isLoading) return <PageLoader />;

  if (!post) return <PageNotFound />;

  const {
    title,
    description,
    author: { name },
    createdAt,
    categories,
  } = post;

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="w-full">
        <Header
          title={title}
          actionBlock={
            <Button
              className="ml-auto mt-auto"
              icon={Highlight}
              style="text"
              to={buildUrl(routes.posts.edit, { slug })}
              tooltipProps={{
                position: "top",
                content: "Edit",
              }}
            />
          }
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
                {getDateStringFromTimestamp(createdAt)}
              </Typography>
            </div>
          </div>
          <Typography>{description}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Details;
