import CellRenderer from "./CellRenderer";
import { getCategoriesString, getLastUpdatedAtDateTimeString } from "./utils";

export const COLUMN_DATA = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Categories",
    dataIndex: "categories",
    key: "categories",
    render: getCategoriesString,
  },
  {
    title: "Last Published At",
    dataIndex: "lastPublishedAt",
    key: "lastPublishedAt",
    render: getLastUpdatedAtDateTimeString,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: CellRenderer,
  },
];
