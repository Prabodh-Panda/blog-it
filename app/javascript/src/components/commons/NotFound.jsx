import React from "react";

import { NoData } from "neetoui";

const NotFound = ({ title }) => (
  <div className="flex h-full w-full items-center justify-center">
    <NoData title={title} />
  </div>
);

export default NotFound;
