import React from "react";

import BlogItem from "components/Blogs/Item";
import { PageLoader } from "components/commons";
import { useFetchPosts } from "hooks/reactQuery/usePosts";
import useQueryParams from "hooks/useQueryParams";
import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

const List = () => {
  const { t } = useTranslation();
  const params = useQueryParams();

  const {
    data: { posts },
    isLoading,
  } = useFetchPosts(params);

  if (isLoading) return <PageLoader />;

  if (isEmpty(posts)) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NoData title={t("errors.noPostsFound")} />
      </div>
    );
  }

  return (
    <div className="h-0 flex-1 overflow-auto px-16">
      {posts.map(post => (
        <BlogItem key={post.id} {...post} />
      ))}
    </div>
  );
};

export default List;
