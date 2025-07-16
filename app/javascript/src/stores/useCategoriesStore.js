import { append, includes, without } from "ramda";
import { create } from "zustand";

const useCategoriesStore = create(set => ({
  activeCategorySlugs: [],
  isCategoriesPaneOpen: false,
  isNewCategoryModalOpen: false,

  toggleIsCategoriesPaneOpen: () =>
    set(state => ({ isCategoriesPaneOpen: !state.isCategoriesPaneOpen })),

  setIsCategoriesPaneOpen: isOpen =>
    set(() => ({ isCategoriesPaneOpen: isOpen })),

  setIsNewCategoryModalOpen: isOpen =>
    set(() => ({ isNewCategoryModalOpen: isOpen })),

  toggleSlugActiveState: slug =>
    set(state => {
      if (includes(slug, state.activeCategorySlugs)) {
        return {
          activeCategorySlugs: without([slug], state.activeCategorySlugs),
        };
      }

      return { activeCategorySlugs: append(slug, state.activeCategorySlugs) };
    }),

  setActiveCategorySlugs: slugs => set(() => ({ activeCategorySlugs: slugs })),
}));

export default useCategoriesStore;
