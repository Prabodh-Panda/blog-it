import React from "react";

import { NavLink } from "react-router-dom";

const Item = ({ to, icon }) => (
  <NavLink
    exact
    activeClassName="bg-black text-white hover:!bg-black"
    className="block rounded-md  p-2 hover:bg-gray-200"
    {...{ to }}
  >
    {icon}
  </NavLink>
);

export default Item;
