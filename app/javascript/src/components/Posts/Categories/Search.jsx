import React from "react";

import { Input } from "neetoui";

const Search = ({ isOpen, value, onChange }) => {
  if (!isOpen) return null;

  return (
    <div>
      <Input {...{ value, onChange }} />
    </div>
  );
};

export default Search;
