import React from "react";

import BlogItem from "components/Blogs/Item";
import { useFetchPosts } from "hooks/reactQuery/usePosts";
import { Typography, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";

const Blogs = () => {
  const { t } = useTranslation();

  const {
    data: { posts },
    isLoading,
  } = useFetchPosts();

  return (
    <div className="flex-1 px-16 py-10">
      <Typography style="h1" weight="black">
        {t("titles.blogPosts")}
      </Typography>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {posts.map(post => (
            <BlogItem key={post.id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
