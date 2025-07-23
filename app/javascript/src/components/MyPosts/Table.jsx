import React from "react";

import { PageLoader } from "components/commons";
import NotFound from "components/commons/NotFound";
import { useFetchMyPosts } from "hooks/reactQuery/useMyPosts";
import { Table as NeetoUITable } from "neetoui";
import { isEmpty } from "ramda";

import { COLUMN_DATA } from "./constants";

const Table = () => {
  const { data: { posts } = {}, isLoading } = useFetchMyPosts();

  if (isLoading) return <PageLoader />;

  if (isEmpty(posts)) return <NotFound title="No Posts Found" />;

  return (
    <div className="px-16">
      <NeetoUITable columnData={COLUMN_DATA} rowData={posts} />
    </div>
  );
};

export default Table;
