import React from "react";

import { Header, PageLoader } from "components/commons";
import { useShowPost } from "hooks/reactQuery/usePosts";
import { Typography } from "neetoui";
import { useParams } from "react-router-dom";

const Show = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useShowPost(slug);

  if (isLoading) return <PageLoader />;

  const { title, description } = post;

  return (
    <div>
      <Header {...{ title }} />
      <div className="px-16 pb-4">
        <Typography>{description}</Typography>
      </div>
    </div>
  );
};

export default Show;
