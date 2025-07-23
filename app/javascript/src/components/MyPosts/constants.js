import dayjs from "dayjs";
import { capitalize } from "neetocist";

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
    render: categories => categories.map(category => category.name).join(", "),
  },
  {
    title: "Last Published At",
    dataIndex: "lastPublishedAt",
    key: "lastPublishedAt",
    render: lastPublishedAt =>
      lastPublishedAt
        ? dayjs(lastPublishedAt).format("DD MMM, YYYY, hh:mm A")
        : "Has not been published",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: status => capitalize(status),
  },
];
