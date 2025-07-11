import React from "react";

import { Header } from "components/commons";
import { useCreatePost } from "hooks/reactQuery/usePosts";
import { Button } from "neetoui";
import { Form, Input, Textarea } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import routes from "routes";

import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  NEW_BLOG_INITIAL_VALUES,
  NEW_BLOG_VALIDATION_SCHEMA,
} from "./constants";

const New = () => {
  const { t } = useTranslation();

  const { mutate: createPost } = useCreatePost();

  const handleSubmit = async postData => {
    createPost(postData);
  };

  return (
    <div className="flex flex-1 flex-col">
      <Header title={t("titles.newBlogPost")} />
      <div className="w-full flex-1 px-16 pb-10">
        <Form
          className="flex h-full flex-col justify-start rounded-lg border p-10"
          formikProps={{
            initialValues: NEW_BLOG_INITIAL_VALUES,
            validationSchema: NEW_BLOG_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          <div>
            <Input
              required
              label={t("labels.title")}
              maxLength={MAX_TITLE_LENGTH}
              name="title"
              placeholder={t("placeholders.title")}
            />
            <Textarea
              required
              className="my-4"
              label={t("labels.description")}
              maxLength={MAX_DESCRIPTION_LENGTH}
              name="description"
              placeholder={t("placeholders.description")}
            />
          </div>
          <div className="ml-auto mt-auto space-x-2">
            <Button style="secondary" to={routes.blogs.index}>
              {t("labels.cancel")}
            </Button>
            <Button className="bg-black" type="submit">
              {t("labels.submit")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default New;
