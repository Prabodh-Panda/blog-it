import dayjs from "dayjs";
import { t } from "i18next";

export const getDateStringFromTimestamp = timestamp =>
  timestamp
    ? dayjs(timestamp).format("DD MMMM YYYY")
    : t("messages.notPublishedYet");

export const getPayloadFromFormData = (formData, status) => ({
  ...formData,
  category_ids: formData.categories.map(category => category.value),
  status,
});

export const getCategoryOptions = categories => {
  if (!categories) return [];

  return categories.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};
