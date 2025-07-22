import React from "react";

import { PageLoader } from "components/commons";
import NotFound from "components/commons/NotFound";
import { useFetchPosts } from "hooks/reactQuery/usePosts";
import useQueryParams from "hooks/useQueryParams";
import { Pagination } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants";
import PostItem from "./Item";

const List = () => {
  const { t } = useTranslation();
  const queryParams = useQueryParams();

  const history = useHistory();

  const { page } = queryParams;

  const { data: { posts, totalCount } = {}, isLoading } =
    useFetchPosts(queryParams);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.posts.index, mergeLeft({ page }, queryParams))
    );

  if (isLoading) return <PageLoader />;

  if (isEmpty(posts)) return <NotFound title={t("errors.noPostsFound")} />;

  return (
    <div className="flex h-0 flex-1 flex-col">
      <div className="h-0 flex-1 overflow-y-auto px-16">
        {posts.map(post => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
      <Pagination
        className="float-right my-4 mr-4"
        count={totalCount}
        navigate={handlePageNavigation}
        pageNo={Number(page) || DEFAULT_PAGE}
        pageSize={DEFAULT_PAGE_SIZE}
      />
    </div>
  );
};

export default List;
