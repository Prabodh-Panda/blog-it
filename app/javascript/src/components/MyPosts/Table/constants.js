import { t } from "i18next";

import ActionButtons from "./ActionButtons";
import TitleLink from "./TitleLink";
import {
  getCapitalizedStatus,
  getCategoriesString,
  getLastUpdatedAtDateTimeString,
} from "./utils";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const COLUMN_DATA = [
  {
    title: t("titles.title"),
    dataIndex: "title",
    key: "title",
    render: TitleLink,
    width: 450,
  },
  {
    title: t("titles.categories"),
    dataIndex: "categories",
    key: "categories",
    render: getCategoriesString,
  },
  {
    title: t("titles.lastPublishedAt"),
    dataIndex: "lastPublishedAt",
    key: "lastPublishedAt",
    render: getLastUpdatedAtDateTimeString,
  },
  {
    title: t("titles.status"),
    dataIndex: "status",
    key: "status",
    render: getCapitalizedStatus,
  },
  {
    title: "",
    key: "actionButtons",
    render: ActionButtons,
  },
];
