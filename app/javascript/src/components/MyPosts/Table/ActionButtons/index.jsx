import React from "react";

import ActionButtonsCell from "./Cell";

const ActionButtons = (status, { slug, title }) => (
  <ActionButtonsCell {...{ status, slug, title }} />
);

export default ActionButtons;
