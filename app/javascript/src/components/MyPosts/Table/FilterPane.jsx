import React, { useRef } from "react";

import { useFetchCategories } from "hooks/reactQuery/useCategories";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Button, Pane, Typography } from "neetoui";
import { Form, Input, Select } from "neetoui/formik";
import { mergeLeft, pluck } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { STATUS_OPTIONS } from "./constants";
import {
  getCategoriesOption,
  getSelectedCategoriesOptions,
  getSelectedStatusOption,
} from "./utils";

const { Header, Body, Footer } = Pane;

const FilterPane = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const { data: categories = [] } = useFetchCategories();
  const categoryOptions = getCategoriesOption(categories);

  const formikRef = useRef();

  const history = useHistory();

  const params = useQueryParams();
  const { page, title, categories: categoriesParam, status } = params;

  const formInitialValues = {
    title: title || "",
    categories: getSelectedCategoriesOptions(categoriesParam, categoryOptions),
    status: getSelectedStatusOption(status, STATUS_OPTIONS) || null,
  };

  const handleSubmitClick = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const handleSubmit = ({ title, status, categories }) => {
    const updatedParams = {
      title: title || null,
      status: status?.value || null,
      categories: pluck("value", categories) || null,
    };

    history.replace(
      buildUrl(
        routes.myPosts.index,
        mergeLeft({ page }, filterNonNull(updatedParams))
      )
    );

    onClose(false);
  };

  const handleResetClick = () => {
    history.replace(buildUrl(routes.myPosts.index, { page }));
    onClose(false);
  };

  return (
    <Pane {...{ isOpen, onClose }}>
      <Header>
        <Typography style="h2" weight="semibold">
          {t("titles.filters")}
        </Typography>
      </Header>
      <Body>
        <Form
          className="w-full space-y-4"
          formikProps={{
            initialValues: formInitialValues,
            innerRef: formikRef,
            onSubmit: handleSubmit,
          }}
        >
          <Input
            label={t("labels.title")}
            name="title"
            placeholder={t("placeholders.title")}
          />
          <Select
            isMulti
            label={t("labels.category")}
            name="categories"
            options={categoryOptions}
            placeholder={t("placeholders.categories")}
          />
          <Select
            isClearable
            label={t("labels.status")}
            name="status"
            options={STATUS_OPTIONS}
            placeholder={t("placeholders.status")}
          />
        </Form>
      </Body>
      <Footer className="space-x-4">
        <Button label={t("labels.done")} onClick={handleSubmitClick} />
        <Button
          label={t("labels.clearFilters")}
          style="secondary"
          onClick={handleResetClick}
        />
      </Footer>
    </Pane>
  );
};

export default FilterPane;
