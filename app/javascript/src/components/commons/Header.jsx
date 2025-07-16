import React from "react";

import { Typography } from "neetoui";

const Header = ({ title, actionBlock, preHeaderContent }) => (
  <div className="flex items-center justify-between px-16 py-10 pb-4">
    <div>
      {preHeaderContent}
      <Typography style="h1" weight="black">
        {title}
      </Typography>
    </div>
    {actionBlock}
  </div>
);

export default Header;
