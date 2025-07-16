import { append, includes, without } from "ramda";
import { create } from "zustand";

const useCategoriesStore = create(set => ({
  activeCategoryIds: [],
  isCategoriesPaneOpen: false,
  isNewCategoryModalOpen: false,

  toggleIsCategoriesPaneOpen: () =>
    set(state => ({ isCategoriesPaneOpen: !state.isCategoriesPaneOpen })),

  setIsCategoriesPaneOpen: isOpen =>
    set(() => ({ isCategoriesPaneOpen: isOpen })),

  setIsNewCategoryModalOpen: isOpen =>
    set(() => ({ isNewCategoryModalOpen: isOpen })),

  toggleIdActiveState: id =>
    set(state => {
      if (includes(id, state.activeCategoryIds)) {
        return {
          activeCategoryIds: without([id], state.activeCategoryIds),
        };
      }

      return { activeCategoryIds: append(id, state.activeCategoryIds) };
    }),

  setActiveCategoryIds: ids => set(() => ({ activeCategoryIds: ids })),
}));

export default useCategoriesStore;
