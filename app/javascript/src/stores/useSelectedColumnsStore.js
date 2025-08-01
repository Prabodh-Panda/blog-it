import { append, includes, without } from "ramda";
import { create } from "zustand";

import { INITIAL_SELECTED_COLUMN_NAMES } from "./constants";

const useSelectedColumnsStore = create(set => ({
  selectedColumnNames: INITIAL_SELECTED_COLUMN_NAMES,

  toggleSelectedColumnState: name =>
    set(({ selectedColumnNames }) => ({
      selectedColumnNames: includes(name, selectedColumnNames)
        ? without([name], selectedColumnNames)
        : append(name, selectedColumnNames),
    })),
}));

export default useSelectedColumnsStore;
