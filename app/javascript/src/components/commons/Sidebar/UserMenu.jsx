import React, { useRef } from "react";

import { useLogout } from "hooks/reactQuery/useAuth";
import { LeftArrow } from "neetoicons";
import { Avatar, Button, Popover, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { getFromLocalStorage } from "utils/storage";

const UserMenu = () => {
  const { t } = useTranslation();

  const avatarRef = useRef();

  const { mutate: logout } = useLogout();

  const history = useHistory();

  const name = getFromLocalStorage("authUserName");
  const email = getFromLocalStorage("authEmail");

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        history.replace(routes.auth.login);
      },
    });
  };

  return (
    <>
      <div className="mt-auto" ref={avatarRef}>
        <Avatar size="large" user={{ name }} />
      </div>
      <Popover reference={avatarRef}>
        <div className="mb-4 flex items-center gap-2 border-b pb-4">
          <Avatar size="large" user={{ name }} />
          <div>
            <Typography style="body2" weight="bold">
              {name}
            </Typography>
            <Typography style="body3">{email}</Typography>
          </div>
        </div>
        <Button
          icon={LeftArrow}
          iconPosition="left"
          style="text"
          onClick={handleLogout}
        >
          {t("labels.logout")}
        </Button>
      </Popover>
    </>
  );
};

export default UserMenu;
