import React from "react";

import BlogItem from "components/Blogs/Item";
import { Header, PageLoader } from "components/commons";
import { useFetchPosts } from "hooks/reactQuery/usePosts";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "routes";

import Categories from "./Categories";

const Blogs = () => {
  const { t } = useTranslation();

  const {
    data: { posts },
    isLoading,
  } = useFetchPosts();

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex">
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
        <div className="h-0 flex-1 overflow-auto px-16">
          {posts.map(post => (
            <BlogItem key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
