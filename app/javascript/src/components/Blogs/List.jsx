import React from "react";

import BlogItem from "components/Blogs/Item";
import { PageLoader } from "components/commons";
import { useFetchPosts } from "hooks/reactQuery/usePosts";
import useQueryParams from "hooks/useQueryParams";
import { NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants";

const List = () => {
  const { t } = useTranslation();
  const params = useQueryParams();

  const { page } = params;

  const { data: { posts, totalCount } = {}, isLoading } = useFetchPosts(params);

  if (isLoading) return <PageLoader />;

  if (isEmpty(posts)) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NoData title={t("errors.noPostsFound")} />
      </div>
    );
  }

  return (
    <div className="flex h-0 flex-1 flex-col">
      <div className="h-0 flex-1 overflow-y-auto px-16">
        {posts.map(post => (
          <BlogItem key={post.id} {...post} />
        ))}
      </div>
      <Pagination
        className="float-right my-4 mr-4"
        count={totalCount}
        pageNo={Number(page) || DEFAULT_PAGE}
        pageSize={DEFAULT_PAGE_SIZE}
      />
    </div>
  );
};

export default List;
