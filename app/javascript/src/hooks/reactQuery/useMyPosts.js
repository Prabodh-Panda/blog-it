import { QUERY_KEYS } from "constants/query";

import myPostsApi from "apis/myPosts";
import { useQuery } from "react-query";

export const useFetchMyPosts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS, params],
    queryFn: () => myPostsApi.fetch(params),
  });
