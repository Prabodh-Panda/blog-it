import dayjs from "dayjs";

export const getDateStringFromTimestamp = timestamp =>
  dayjs(timestamp).format("DD MMMM YYYY");
