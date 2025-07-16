import { append, includes, without } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCategoriesStore = create(
  persist(
    set => ({
      activeCategoryIds: [],
      isCategoriesPaneOpen: false,
      isNewCategoryModalOpen: false,

      toggleIsCategoriesPageOpen: () =>
        set(state => ({ isCategoriesPaneOpen: !state.isCategoriesPaneOpen })),

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
    }),
    { name: "categories-store" }
  )
);

export default useCategoriesStore;
