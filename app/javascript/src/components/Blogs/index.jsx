import React, { useState } from "react";

import { Book } from "neetoicons";
import { Button } from "neetoui";

const Blogs = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <Book />
      <Button>Hello</Button>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
};

export default Blogs;
