import React from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategories";
import { useCreatePost } from "hooks/reactQuery/usePosts";
import { Button } from "neetoui";
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

const New = () => {
  const { t } = useTranslation();

  const { mutate: createPost, isLoading: isCreatePostLoading } =
    useCreatePost();

  const { data: { categories } = {}, isLoading: isFetchCategoriesLoading } =
    useFetchCategories();

  const history = useHistory();

  const handleSubmit = async postData => {
    const payload = {
      ...postData,
      category_ids: postData.categories.map(category => category.value),
      user_id: 1,
      organization_id: 1,
    };

    createPost(payload, {
      onSuccess: () => {
        history.push(routes.posts.index);
      },
    });
  };

  if (isFetchCategoriesLoading) return <PageLoader />;

  return (
    <div className="flex flex-1 flex-col">
      <Header title={t("titles.newBlogPost")} />
      <div className="w-full flex-1 px-16 pb-10">
        <Form
          className="flex h-full flex-col justify-start rounded-lg border p-10"
          formikProps={{
            initialValues: NEW_POST_INITIAL_VALUES,
            validationSchema: NEW_POST_VALIDATION_SCHEMA,
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
              isMulti
              required
              label={t("labels.category")}
              name="categories"
              options={getCategoryOptions(categories)}
            />
            <Textarea
              required
              label={t("labels.description")}
              maxLength={MAX_DESCRIPTION_LENGTH}
              name="description"
              placeholder={t("placeholders.description")}
            />
          </div>
          <div className="ml-auto mt-auto space-x-2">
            <Button
              disabled={isCreatePostLoading}
              style="secondary"
              to={routes.posts.index}
            >
              {t("labels.cancel")}
            </Button>
            <Button
              className="bg-black"
              disabled={isCreatePostLoading}
              type="submit"
            >
              {t("labels.submit")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default New;
