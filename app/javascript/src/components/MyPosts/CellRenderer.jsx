import React from "react";

import StatusCell from "./StatusCell";

const CellRenderer = (status, { slug }) => <StatusCell {...{ status, slug }} />;

export default CellRenderer;
