import dayjs from "dayjs";
import { t } from "i18next";

export const getLastUpdatedAtDateTimeString = timestamp =>
  timestamp
    ? dayjs(timestamp).format("DD MMM, YYYY, hh:mm A")
    : t("messages.notPublished");

export const getCategoriesString = categories =>
  categories.map(category => category.name).join(", ");
