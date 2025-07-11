import React from "react";

import { NoData } from "neetoui";
import routes from "routes";
import withT from "utils/withT";

const PageNotFound = ({ t }) => (
  <div className="flex min-h-screen w-full items-center justify-center">
    <NoData
      title={t("errors.pageNotFound")}
      primaryButtonProps={{
        label: t("labels.backToHome"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: routes.root,
      }}
    />
  </div>
);

export default withT(PageNotFound);
