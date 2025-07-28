import dayjs from "dayjs";

export const getLastUpdatedAtDateTimeString = timestamp =>
  timestamp
    ? dayjs(timestamp).format("DD MMM, YYYY, hh:mm A")
    : "Has not been published";

export const getCategoriesString = categories =>
  categories.map(category => category.name).join(", ");
