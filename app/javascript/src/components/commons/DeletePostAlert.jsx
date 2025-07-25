import React from "react";

import { Alert } from "neetoui";
import { Trans } from "react-i18next";
import withT from "utils/withT";

const DeletePostAlert = ({ t, title, isOpen, setIsOpen, onSubmit }) => (
  <Alert
    isOpen={isOpen}
    submitButtonLabel={t("labels.delete")}
    title={t("titles.deletePost")}
    message={
      <Trans
        shouldUnescape
        components={{ strong: <strong /> }}
        i18nKey="messages.deletePost"
        values={{ title }}
      />
    }
    onClose={() => setIsOpen(false)}
    onSubmit={() => {
      onSubmit();
      setIsOpen(false);
    }}
  />
);

export default withT(DeletePostAlert);
