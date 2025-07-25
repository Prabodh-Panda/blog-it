import { t } from "i18next";
import { Book, Edit, List, ListDetails } from "neetoicons";
import routes from "routes";
import { categoriesActions } from "stores/useCategoriesStore";

export const SIDEBAR_ITEMS = [
  {
    key: "blogPosts",
    icon: Book,
    to: routes.posts.index,
    tooltipContent: t("titles.blogPosts"),
  },
  {
    key: "categories",
    icon: List,
    tooltipContent: t("titles.categories"),
    onClick: categoriesActions.toggleIsCategoriesPaneOpen,
  },
  {
    key: "newBlogPost",
    icon: Edit,
    to: routes.posts.new,
    tooltipContent: t("titles.editBlogPost"),
  },
  {
    key: "myBlogPosts",
    icon: ListDetails,
    to: routes.myPosts.index,
    tooltipContent: t("titles.myBlogPosts"),
  },
];
