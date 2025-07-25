import React from "react";

import { PageLoader } from "components/commons";
import {
  useCreateCategory,
  useFetchCategories,
} from "hooks/reactQuery/useCategories";
import { Form as NeetoUIForm, Input, Select, Textarea } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  NEW_POST_INITIAL_VALUES,
  NEW_POST_VALIDATION_SCHEMA,
} from "./constants";
import { getCategoryOptions } from "./utils";

const Form = ({ initialValues, innerRef, onSubmit }) => {
  const { t } = useTranslation();

  const { mutate: createCategory } = useCreateCategory();

  const { data: categories = [], isLoading: isFetchCategoriesLoading } =
    useFetchCategories();

  const handleCreateCategory = name => {
    createCategory({ name });
  };

  const formInitialValues = initialValues || NEW_POST_INITIAL_VALUES;

  if (isFetchCategoriesLoading) {
    return <PageLoader />;
  }

  return (
    <NeetoUIForm
      className="flex h-full flex-col justify-start rounded-lg border p-10"
      formikProps={{
        onSubmit,
        innerRef,
        initialValues: formInitialValues,
        validationSchema: NEW_POST_VALIDATION_SCHEMA,
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
    </NeetoUIForm>
  );
};

export default Form;
