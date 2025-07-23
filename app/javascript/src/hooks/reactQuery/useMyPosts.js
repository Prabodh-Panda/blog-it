import { QUERY_KEYS } from "constants/query";

import myPostsApi from "apis/myPosts";
import { useQuery } from "react-query";

export const useFetchMyPosts = () =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS],
    queryFn: () => myPostsApi.fetch(),
  });
