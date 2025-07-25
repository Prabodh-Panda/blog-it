import { create } from "zustand";

const useCategoriesStore = create(set => ({
  isCategoriesPaneOpen: false,
  isNewCategoryModalOpen: false,

  toggleIsCategoriesPaneOpen: () =>
    set(state => ({ isCategoriesPaneOpen: !state.isCategoriesPaneOpen })),

  setIsCategoriesPaneOpen: isOpen =>
    set(() => ({ isCategoriesPaneOpen: isOpen })),

  setIsNewCategoryModalOpen: isOpen =>
    set(() => ({ isNewCategoryModalOpen: isOpen })),
}));

export const categoriesActions = {
  toggleIsCategoriesPaneOpen: () =>
    useCategoriesStore.getState().toggleIsCategoriesPaneOpen(),
};

export default useCategoriesStore;
