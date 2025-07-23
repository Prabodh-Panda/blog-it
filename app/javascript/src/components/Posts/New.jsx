import React, { useRef, useState } from "react";

import { Header, PageLoader, Sidebar } from "components/commons";
import {
  useCreateCategory,
  useFetchCategories,
} from "hooks/reactQuery/useCategories";
import { useCreatePost } from "hooks/reactQuery/usePosts";
import { ActionDropdown, Button } from "neetoui";
import { Form, Input, Textarea, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  NEW_POST_INITIAL_VALUES,
  NEW_POST_VALIDATION_SCHEMA,
} from "./constants";
import { getCategoryOptions } from "./utils";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = ActionDropdown;

const New = () => {
  const [status, setStatus] = useState("published");

  const { t } = useTranslation();

  const formikRef = useRef();

  const { mutate: createPost, isLoading: isCreatePostLoading } =
    useCreatePost();

  const { mutate: createCategory, isLoading: isCreateCategoryLoading } =
    useCreateCategory();

  const { data: { categories } = {}, isLoading: isFetchCategoriesLoading } =
    useFetchCategories();

  const history = useHistory();

  const handleSubmit = async postData => {
    const payload = {
      ...postData,
      status,
      category_ids: postData.categories.map(category => category.value),
    };

    createPost(payload, {
      onSuccess: () => {
        history.push(routes.myPosts.index);
      },
    });
  };

  const handleSubmitButtonClick = () => {
    if (formikRef.current) formikRef.current.submitForm();
  };

  const handleCreateCategory = name => {
    createCategory({ name });
  };

  if (isFetchCategoriesLoading || isCreateCategoryLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header
          title={t("titles.newBlogPost")}
          actionBlock={
            <div className="ml-auto mt-auto space-x-2">
              <Button
                disabled={isCreatePostLoading}
                style="secondary"
                to={routes.posts.index}
              >
                {t("labels.cancel")}
              </Button>
              <ActionDropdown
                label={status === "published" ? "Publish" : "Save as draft"}
                onClick={handleSubmitButtonClick}
              >
                <Menu>
                  <MenuItemButton onClick={() => setStatus("published")}>
                    Publish
                  </MenuItemButton>
                  <MenuItemButton onClick={() => setStatus("draft")}>
                    Save as draft
                  </MenuItemButton>
                </Menu>
              </ActionDropdown>
            </div>
          }
        />
        <div className="w-full flex-1 px-16 pb-10">
          <Form
            className="flex h-full flex-col justify-start rounded-lg border p-10"
            formikProps={{
              initialValues: NEW_POST_INITIAL_VALUES,
              validationSchema: NEW_POST_VALIDATION_SCHEMA,
              innerRef: formikRef,
              onSubmit: handleSubmit,
            }}
          >
            <div className="space-y-4">
              <Input
                required
                label={t("labels.title")}
                maxLength={MAX_TITLE_LENGTH}
                name="title"
                placeholder={t("placeholders.title")}
              />
              <Select
                isCreateable
                isMulti
                required
                label={t("labels.category")}
                name="categories"
                options={getCategoryOptions(categories)}
                onCreateOption={handleCreateCategory}
              />
              <Textarea
                required
                label={t("labels.description")}
                maxLength={MAX_DESCRIPTION_LENGTH}
                name="description"
                placeholder={t("placeholders.description")}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default New;
