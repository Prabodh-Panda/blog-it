import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery } from "react-query";
import queryClient from "utils/queryClient";

import { invalidateQueryKeysWithDelay } from "./utils";

export const useFetchPosts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, params],
    queryFn: () => postsApi.fetch(params),
  });

export const useCreatePost = () =>
  useMutation(postsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
    },
  });

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, slug],
    queryFn: () => postsApi.show(slug),
    retry: false,
  });

export const useUpdatePost = () =>
  useMutation(postsApi.update, {
    onSuccess: (_data, { slug }) => {
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.POSTS, slug]);
    },
  });

export const useDestroyPost = () =>
  useMutation(postsApi.destroy, {
    onSuccess: (_data, { slug }) => {
      invalidateQueryKeysWithDelay(
        [[QUERY_KEYS.MY_POSTS], [QUERY_KEYS.POSTS], [QUERY_KEYS.POSTS, slug]],
        50
      );
    },
  });
