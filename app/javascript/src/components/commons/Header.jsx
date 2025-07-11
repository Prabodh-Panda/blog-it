import React from "react";

import { Typography } from "neetoui";

const Header = ({ title, actionBlock }) => (
  <div className="flex items-center justify-between px-16 py-10 pb-4">
    <Typography style="h1" weight="black">
      {title}
    </Typography>
    {actionBlock}
  </div>
);

export default Header;
