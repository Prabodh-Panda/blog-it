import React, { useState } from "react";

import { PageLoader } from "components/commons";
import { useFetchMyPosts } from "hooks/reactQuery/useMyPosts";
import useQueryParams from "hooks/useQueryParams";
import { Filter } from "neetoicons";
import { Button, Table as NeetoUITable, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useSelectedColumnsStore from "stores/useSelectedColumnsStore";
import { buildUrl } from "utils/url";

import ColumnSelector from "./ColumnSelector";
import { COLUMN_DATA, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants";
import FilterPane from "./FilterPane";
import { getFilteredColumns } from "./utils";

const Table = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);

  const selectedColumnNames = useSelectedColumnsStore(
    state => state.selectedColumnNames
  );

  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();
  const { page } = queryParams;

  const { data: { posts, totalCount } = {}, isLoading } =
    useFetchMyPosts(queryParams);

  const handlePageNavigation = page =>
    history.replace(buildUrl(routes.myPosts.index, { page }));

  if (isLoading) return <PageLoader />;

  return (
    <div className="px-16">
      <div className="mb-4 flex items-center justify-between">
        <Typography weight="medium">
          {t("messages.articleCount", { count: totalCount })}
        </Typography>
        <div className="flex items-center gap-4">
          <ColumnSelector />
          <Button
            icon={Filter}
            style="text"
            onClick={() => setIsFilterPaneOpen(true)}
          />
        </div>
      </div>
      <NeetoUITable
        rowSelection
        columnData={getFilteredColumns(selectedColumnNames, COLUMN_DATA)}
        currentPageNumber={Number(page) || DEFAULT_PAGE}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        handlePageChange={handlePageNavigation}
        rowData={posts}
        selectedRowKeys={selectedRowKeys}
        totalCount={totalCount}
        onRowSelect={setSelectedRowKeys}
      />
      <FilterPane isOpen={isFilterPaneOpen} onClose={setIsFilterPaneOpen} />
    </div>
  );
};

export default Table;
