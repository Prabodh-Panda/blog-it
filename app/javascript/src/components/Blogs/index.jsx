import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import BlogItem from "components/Blogs/Item";
import Logger from "js-logger";
import { Typography, Spinner } from "neetoui";

const Blogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
      setIsLoading(false);
    } catch (error) {
      Logger.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex-1 px-16 py-10">
      <Typography style="h1" weight="black">
        Blog posts
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
