import React from "react";

import { useCreateCategory } from "hooks/reactQuery/useCategories";
import { Button, Modal, Typography } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import useCategoriesStore from "stores/useCategoriesStore";

import {
  NEW_CATEGORY_INITIAL_VALUES,
  NEW_CATEGORY_VALIDATION_SCHEMA,
} from "./constants";

const { Header, Body, Footer } = Modal;

const New = () => {
  const setIsNewCategoryModalOpen = useCategoriesStore(
    state => state.setIsNewCategoryModalOpen
  );

  const { mutate: createCategory, isLoading } = useCreateCategory();

  const { t } = useTranslation();

  const handleSubmit = payload => {
    createCategory(payload, {
      onSuccess: () => setIsNewCategoryModalOpen(false),
    });
  };

  return (
    <Form
      formikProps={{
        initialValues: NEW_CATEGORY_INITIAL_VALUES,
        validationSchema: NEW_CATEGORY_VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
      }}
    >
      <Header>
        <Typography style="h2">{t("titles.newCategory")}</Typography>
      </Header>
      <Body>
        <Input required label={t("labels.categoryTitle")} name="name" />
      </Body>
      <Footer className="space-x-2">
        <Button className="bg-black" disabled={isLoading} type="submit">
          {t("labels.add")}
        </Button>
        <Button
          disabled={isLoading}
          style="text"
          onClick={() => setIsNewCategoryModalOpen(false)}
        >
          {t("labels.cancel")}
        </Button>
      </Footer>
    </Form>
  );
};

export default New;
