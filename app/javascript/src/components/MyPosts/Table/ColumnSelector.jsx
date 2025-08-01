import React from "react";

import { ActionDropdown, Checkbox } from "neetoui";
import { includes, paths } from "ramda";
import useSelectedColumnsStore from "stores/useSelectedColumnsStore";
import withT from "utils/withT";
import { useShallow } from "zustand/react/shallow";

import { COLUMN_NAME_SELECTOR_OPTIONS } from "./constants";

const { Menu } = ActionDropdown;

const ColumnSelector = ({ t }) => {
  const [selectedColumnNames, toggleSelectedColumnState] =
    useSelectedColumnsStore(
      useShallow(
        paths([["selectedColumnNames"], ["toggleSelectedColumnState"]])
      )
    );

  return (
    <ActionDropdown
      buttonStyle="secondary"
      label={t("labels.columns")}
      dropdownProps={{
        closeOnSelect: false,
      }}
    >
      <Menu>
        {COLUMN_NAME_SELECTOR_OPTIONS.map(({ name, label, disabled }) => (
          <Checkbox
            checked={includes(name, selectedColumnNames)}
            className="p-2"
            key={name}
            onChange={() => toggleSelectedColumnState(name)}
            {...{ label, disabled }}
          />
        ))}
      </Menu>
    </ActionDropdown>
  );
};

export default withT(ColumnSelector);
