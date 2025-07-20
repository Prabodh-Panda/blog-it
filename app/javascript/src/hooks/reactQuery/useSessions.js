import { QUERY_KEYS } from "constants/query";

import sessionsApi from "apis/sessions";
import { useMutation } from "react-query";
import queryClient from "utils/queryClient";

export const useCreateSession = () =>
  useMutation(sessionsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.SESSIONS]);
    },
  });
