import queryClient from "utils/queryClient";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const invalidateQueryKeys = queryKeysArray =>
  queryKeysArray.map(queryKeys => queryClient.invalidateQueries(queryKeys));

export const invalidateQueryKeysWithDelay = async (queryKeys, delayMs) => {
  await delay(delayMs);
  invalidateQueryKeys(queryKeys);
};
