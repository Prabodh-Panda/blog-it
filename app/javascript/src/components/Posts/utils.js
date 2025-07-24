import dayjs from "dayjs";

export const getDateStringFromTimestamp = timestamp =>
  dayjs(timestamp).format("DD MMMM YYYY");

export const getCategoryOptions = categories => {
  if (!categories) return [];

  return categories.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};
