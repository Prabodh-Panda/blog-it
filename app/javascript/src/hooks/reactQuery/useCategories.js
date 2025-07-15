import { QUERY_KEYS } from "constants/query";

import categoriesApi from "apis/categories";
import { useQuery } from "react-query";

export const useFetchCategories = () => {
  const { data = {}, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: () => categoriesApi.fetch(),
  });

  const { data: { categories } = {} } = data;

  return { data: { categories }, isLoading };
};
