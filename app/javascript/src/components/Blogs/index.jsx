import React from "react";

import { Header } from "components/commons";
import { Button } from "neetoui";
import routes from "routes";
import withT from "utils/withT";

import Categories from "./Categories";
import BlogList from "./List";

const Blogs = ({ t }) => (
  <div className="flex w-0 flex-1">
    <Categories />
    <div className="flex flex-1 flex-col">
      <Header
        title={t("titles.blogPosts")}
        actionBlock={
          <Button
            className="bg-black"
            label={t("labels.addNewBlogPost")}
            to={routes.blogs.new}
          />
        }
      />
      <BlogList />
    </div>
  </div>
);

export default withT(Blogs);
