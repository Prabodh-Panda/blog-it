import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useQuery } from "react-query";

export const useFetchPosts = () => {
  const { data = {}, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: () => postsApi.fetch(),
  });

  const { data: { posts } = {} } = data;

  return { data: { posts }, isLoading };
};
