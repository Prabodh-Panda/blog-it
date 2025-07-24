import dayjs from "dayjs";
import { t } from "i18next";

export const getDateStringFromTimestamp = timestamp =>
  timestamp
    ? dayjs(timestamp).format("DD MMMM YYYY")
    : t("messages.notPublishedYet");

export const getCategoryOptions = categories => {
  if (!categories) return [];

  return categories.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};
