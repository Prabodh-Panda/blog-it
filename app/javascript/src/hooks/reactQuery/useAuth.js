import { QUERY_KEYS } from "constants/query";

import authApi from "apis/auth";
import { resetAuthTokens, setAuthHeaders } from "apis/axios";
import { useMutation } from "react-query";
import queryClient from "utils/queryClient";
import { setToLocalStorage } from "utils/storage";

import { invalidateQueryKeys } from "./utils";

export const useLogin = () =>
  useMutation(authApi.login, {
    onSuccess: ({ name, id, authenticationToken, email }) => {
      queryClient.clear();
      setToLocalStorage({
        authToken: authenticationToken,
        userId: id,
        userName: name,
        email,
      });
      setAuthHeaders();
    },
  });

export const useLogout = () =>
  useMutation(authApi.logout, {
    onSuccess: () => {
      queryClient.clear();
      setToLocalStorage({
        authToken: null,
        userId: null,
        userName: null,
        email: null,
      });
      resetAuthTokens();
    },
  });

export const useSignup = () =>
  useMutation(authApi.signup, {
    onSuccess: () => {
      invalidateQueryKeys([[QUERY_KEYS.USERS]]);
    },
  });
