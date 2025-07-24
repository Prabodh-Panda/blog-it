import React from "react";

import { Typography } from "neetoui";

const Header = ({ title, actionBlock, preHeaderContent, suffix }) => (
  <div className="flex items-center justify-between gap-4 px-16 py-10 pb-4">
    <div>
      {preHeaderContent}
      <div className="flex items-center gap-4">
        <Typography style="h1" weight="black">
          {title}
        </Typography>
        {suffix}
      </div>
    </div>
    {actionBlock}
  </div>
);

export default Header;
