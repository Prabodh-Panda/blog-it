import dayjs from "dayjs";
import { t } from "i18next";
import { capitalize } from "neetocist";
import { filter, includes } from "ramda";

export const getLastUpdatedAtDateTimeString = timestamp =>
  timestamp
    ? dayjs(timestamp).format("DD MMM, YYYY, hh:mm A")
    : t("messages.notPublished");

export const getCategoriesString = categories =>
  categories.map(category => category.name).join(", ");

export const getCapitalizedStatus = status => capitalize(status);

export const getFilteredColumns = (selectedNames, columns) =>
  filter(({ key }) => includes(key, selectedNames), columns);
