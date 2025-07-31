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

export const getSelectedCategoriesFromSlugs = (slugs, categories) =>
  slugs ? filter(({ slug }) => includes(slug, slugs), categories) : [];

export const getSelectedStatusOption = (status, options) =>
  findBy({ value: status }, options);

export const getCategoriesString = categories =>
  categories.map(category => category.name).join(", ");

export const getArticleCountText = (selectedCount, articleCount) =>
  selectedCount > 0
    ? t("messages.selectedCount", {
        count: selectedCount,
        totalCount: articleCount,
      })
    : t("messages.articleCount", { count: articleCount });
