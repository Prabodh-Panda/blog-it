import React, { useState } from "react";

import { PageLoader } from "components/commons";
import NotFound from "components/commons/NotFound";
import { useFetchMyPosts } from "hooks/reactQuery/useMyPosts";
import useQueryParams from "hooks/useQueryParams";
import { Table as NeetoUITable, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { COLUMN_DATA, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants";

const Table = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();
  const { page } = queryParams;

  const { data: { posts, totalCount } = {}, isLoading } =
    useFetchMyPosts(queryParams);

  const handlePageNavigation = page =>
    history.replace(buildUrl(routes.myPosts.index, { page }));

  if (isLoading) return <PageLoader />;

  if (isEmpty(posts)) return <NotFound title={t("errors.noPostsFound")} />;

  return (
    <div className="px-16">
      <Typography className="mb-4" weight="medium">
        {t("messages.articleCount", { count: totalCount })}
      </Typography>
      <NeetoUITable
        rowSelection
        columnData={COLUMN_DATA}
        currentPageNumber={Number(page) || DEFAULT_PAGE}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        handlePageChange={handlePageNavigation}
        rowData={posts}
        selectedRowKeys={selectedRowKeys}
        totalCount={totalCount}
        onRowSelect={setSelectedRowKeys}
      />
    </div>
  );
};

export default Table;
