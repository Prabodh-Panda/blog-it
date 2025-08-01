import { QUERY_KEYS } from "constants/query";

import myPostsApi from "apis/myPosts";
import { useMutation, useQuery } from "react-query";

import { invalidateQueryKeys } from "./utils";

export const useFetchMyPosts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS, params],
    queryFn: () => myPostsApi.fetch(params),
  });

export const useBulkDeleteMyPosts = () =>
  useMutation(myPostsApi.bulkDelete, {
    onSuccess: (_data, { slugs }) => {
      const deletedPostsKeys = slugs.map(slug => [QUERY_KEYS.POSTS, slug]);

      invalidateQueryKeys([
        [QUERY_KEYS.POSTS],
        [QUERY_KEYS.MY_POSTS],
        ...deletedPostsKeys,
      ]);
    },
  });

export const useBulkUpdateMyPosts = () =>
  useMutation(myPostsApi.bulkUpdate, {
    onSuccess: (_data, { slugs }) => {
      const updatedPostKeys = slugs.map(slug => [QUERY_KEYS.POSTS, slug]);

      invalidateQueryKeys([
        [QUERY_KEYS.POSTS],
        [QUERY_KEYS.MY_POSTS],
        ...updatedPostKeys,
      ]);
    },
  });
