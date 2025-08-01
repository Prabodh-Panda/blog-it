import React, { useState } from "react";

import { PageLoader } from "components/commons";
import {
  useBulkDeleteMyPosts,
  useBulkUpdateMyPosts,
  useFetchMyPosts,
} from "hooks/reactQuery/useMyPosts";
import useQueryParams from "hooks/useQueryParams";
import { Filter } from "neetoicons";
import { Button, Table as NeetoUITable, Typography, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useSelectedColumnsStore from "stores/useSelectedColumnsStore";
import { buildUrl } from "utils/url";

import ActiveFilterDisplay from "./ActiveFilterDisplay";
import ColumnSelector from "./ColumnSelector";
import { COLUMN_DATA, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants";
import FilterPane from "./FilterPane";
import { getArticleCountText, getFilteredColumns } from "./utils";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = Dropdown;

const Table = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);

  const { t } = useTranslation();

  const selectedColumnNames = useSelectedColumnsStore(
    state => state.selectedColumnNames
  );

  const history = useHistory();

  const queryParams = useQueryParams();
  const { page, title } = queryParams;

  const { data: { posts, totalCount } = {}, isLoading } =
    useFetchMyPosts(queryParams);

  const { mutate: bulkDeleteMyPosts } = useBulkDeleteMyPosts();
  const { mutate: bulkUpdateMyPosts } = useBulkUpdateMyPosts();

  const handlePageNavigation = page =>
    history.replace(buildUrl(routes.myPosts.index, { page }));

  const handleBulkDelete = () => {
    bulkDeleteMyPosts({ slugs: selectedRowKeys });
  };

  const handleBulkUpdate = status => {
    bulkUpdateMyPosts({ status, slugs: selectedRowKeys });
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="px-16">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-4">
          <Typography weight="medium">
            {getArticleCountText(selectedRowKeys.length, totalCount, title)}
          </Typography>
          <ActiveFilterDisplay />
        </div>
        {selectedRowKeys.length > 0 ? (
          <div className="flex items-center gap-2">
            <Dropdown buttonStyle="secondary" label={t("labels.changeStatus")}>
              <Menu>
                <MenuItemButton onClick={() => handleBulkUpdate("draft")}>
                  {t("labels.draft")}
                </MenuItemButton>
                <MenuItemButton onClick={() => handleBulkUpdate("published")}>
                  {t("labels.publish")}
                </MenuItemButton>
              </Menu>
            </Dropdown>
            <Button
              label={t("labels.delete")}
              style="danger-text"
              onClick={handleBulkDelete}
            />
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-4">
            <ColumnSelector />
            <Button
              icon={Filter}
              style="text"
              onClick={() => setIsFilterPaneOpen(true)}
            />
          </div>
        )}
      </div>
      <NeetoUITable
        rowSelection
        columnData={getFilteredColumns(selectedColumnNames, COLUMN_DATA)}
        currentPageNumber={Number(page) || DEFAULT_PAGE}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        handlePageChange={handlePageNavigation}
        rowData={posts}
        rowKey="slug"
        selectedRowKeys={selectedRowKeys}
        totalCount={totalCount}
        onRowSelect={setSelectedRowKeys}
      />
      <FilterPane isOpen={isFilterPaneOpen} onClose={setIsFilterPaneOpen} />
    </div>
  );
};

export default Table;
