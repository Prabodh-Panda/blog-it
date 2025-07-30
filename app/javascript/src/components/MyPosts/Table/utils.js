import dayjs from "dayjs";
import { t } from "i18next";
import { capitalize, findBy } from "neetocist";
import { filter, includes } from "ramda";

export const getLastUpdatedAtDateTimeString = timestamp =>
  timestamp
    ? dayjs(timestamp).format("DD MMM, YYYY, hh:mm A")
    : t("messages.notPublished");

export const getCapitalizedStatus = status => capitalize(status);

export const getFilteredColumns = (selectedNames, columns) =>
  filter(({ key }) => includes(key, selectedNames), columns);

export const getCategoriesOption = categories =>
  categories.map(({ slug, name }) => ({
    value: slug,
    label: name,
  }));

export const getSelectedCategoriesOptions = (slugs, options = []) =>
  slugs ? filter(({ value }) => includes(value, slugs), options) : [];

export const getSelectedStatusOption = (status, options) =>
  findBy({ value: status }, options);
