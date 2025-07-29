import React, { useState } from "react";

import { DeletePostAlert } from "components/commons";
import { useDestroyPost } from "hooks/reactQuery/usePosts";
import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";

import DeleteMenuItem from "./DeleteMenuItem";
import UpdateMenuItem from "./UpdateMenuItem";

const { Menu } = Dropdown;

const Cell = ({ status, slug, title }) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { mutate: destroyPost } = useDestroyPost();

  const handleDeletePost = () => {
    destroyPost({ slug, quiet: true });
  };

  return (
    <div>
      <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
        <Menu>
          <UpdateMenuItem {...{ status, slug }} />
          <DeleteMenuItem onClick={() => setIsDeleteAlertOpen(true)} />
        </Menu>
      </Dropdown>
      <DeletePostAlert
        isOpen={isDeleteAlertOpen}
        setIsOpen={setIsDeleteAlertOpen}
        title={title}
        onSubmit={handleDeletePost}
      />
    </div>
  );
};

export default Cell;
