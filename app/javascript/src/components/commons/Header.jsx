import React from "react";

import { Typography } from "neetoui";

const Header = ({ title }) => (
  <div className="px-16 py-10 pb-4">
    <Typography style="h1" weight="black">
      {title}
    </Typography>
  </div>
);

export default Header;
