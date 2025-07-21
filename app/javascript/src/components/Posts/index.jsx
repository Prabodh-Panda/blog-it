import React from "react";

import { Header, Sidebar } from "components/commons";
import { Button } from "neetoui";
import routes from "routes";
import withT from "utils/withT";

import Categories from "./Categories";
import PostList from "./List";

const Posts = ({ t }) => (
  <div className="flex h-screen w-screen flex-1">
    <Sidebar />
    <Categories />
    <div className="flex flex-1 flex-col">
      <Header
        title={t("titles.blogPosts")}
        actionBlock={
          <Button
            className="bg-black"
            label={t("labels.addNewBlogPost")}
            to={routes.posts.new}
          />
        }
      />
      <PostList />
    </div>
  </div>
);

export default withT(Posts);
