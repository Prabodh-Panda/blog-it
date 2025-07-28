import React from "react";

import { Button } from "neetoui";

const Item = ({ to, icon, tooltipContent, onClick }) => (
  <Button
    className="block"
    icon={icon}
    style="text"
    to={to}
    tooltipProps={{ content: tooltipContent }}
    onClick={onClick}
  />
);

export default Item;
