import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCategoriesStore = create(
  persist(
    set => ({
      activeCategoryIds: null,
      isCategoriesPaneOpen: false,
      isNewCategoryModalOpen: false,
      setActiveCategoryIds: payload =>
        set(() => ({ activeCategoryIds: payload })),
      toggleIsCategoriesPageOpen: () =>
        set(state => ({ isCategoriesPaneOpen: !state.isCategoriesPaneOpen })),
      setIsNewCategoryModalOpen: payload =>
        set(() => ({ isNewCategoryModalOpen: payload })),
    }),
    { name: "categories-store" }
  )
);

export default useCategoriesStore;
