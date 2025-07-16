import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery } from "react-query";
import queryClient from "utils/queryClient";

export const useFetchPosts = params => {
  const { data = {}, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, params],
    queryFn: () => postsApi.fetch(params),
  });

  const { data: { posts } = {} } = data;

  return { data: { posts }, isLoading };
};

export const useCreatePost = () =>
  useMutation(postsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
    },
  });

export const useShowPost = slug => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, slug],
    queryFn: () => postsApi.show(slug),
    retry: false,
  });

  const post = data?.data?.post;

  return { data: post, isLoading };
};
