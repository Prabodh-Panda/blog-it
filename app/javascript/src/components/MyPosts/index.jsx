import React from "react";

import { Header, Sidebar } from "components/commons";
import withT from "utils/withT";

import MyPostsTable from "./Table";

const MyPosts = ({ t }) => (
  <div className="flex h-screen w-screen flex-1">
    <Sidebar />
    <div className="flex w-0 flex-1 flex-col">
      <Header title={t("titles.myBlogPosts")} />
      <MyPostsTable />
    </div>
  </div>
);

export default withT(MyPosts);
