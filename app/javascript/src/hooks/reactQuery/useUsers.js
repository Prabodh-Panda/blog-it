import { QUERY_KEYS } from "constants/query";

import usersApi from "apis/users";
import { useMutation } from "react-query";
import queryClient from "utils/queryClient";

export const useCreateUser = () =>
  useMutation(usersApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USERS]);
    },
  });
