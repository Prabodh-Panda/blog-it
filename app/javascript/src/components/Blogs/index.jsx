import React, { useState } from "react";

import { Button } from "@bigbinary/neetoui";

const Blogs = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <Button>Hello</Button>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
};

export default Blogs;
