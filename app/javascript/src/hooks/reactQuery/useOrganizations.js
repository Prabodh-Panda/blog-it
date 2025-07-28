import { QUERY_KEYS } from "constants/query";

import organizationsApi from "apis/organizations";
import { prop } from "ramda";
import { useMutation, useQuery } from "react-query";
import queryClient from "utils/queryClient";

export const useFetchOrganizations = () =>
  useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATIONS],
    queryFn: () => organizationsApi.fetch(),
    select: prop("organizations"),
  });

export const useCreateOrganization = () =>
  useMutation(organizationsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.ORGANIZATIONS]);
    },
  });
