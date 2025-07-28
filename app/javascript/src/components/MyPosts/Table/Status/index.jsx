import React from "react";

import StatusCell from "./Cell";

const Status = (status, { slug, title }) => (
  <StatusCell {...{ status, slug, title }} />
);

export default Status;
