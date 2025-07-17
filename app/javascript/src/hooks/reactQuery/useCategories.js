import { QUERY_KEYS } from "constants/query";

import categoriesApi from "apis/categories";
import { useMutation, useQuery } from "react-query";
import queryClient from "utils/queryClient";

export const useFetchCategories = () =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: () => categoriesApi.fetch(),
  });

export const useCreateCategory = () =>
  useMutation(categoriesApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES]);
    },
  });
