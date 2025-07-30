import React, { useRef } from "react";

import { useFetchCategories } from "hooks/reactQuery/useCategories";
import { Button, Pane, Typography } from "neetoui";
import { Form, Input, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { getCategoryOptions } from "utils/categories";
import { buildUrl } from "utils/url";

import { FILTER_INITIAL_VALUES, STATUS_OPTIONS } from "./constants";

const { Header, Body, Footer } = Pane;

const FilterPane = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const { data: categories = [] } = useFetchCategories();

  const formikRef = useRef();

  const history = useHistory();

  const handleSubmitClick = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const handleSubmit = filterData => {
    history.replace(buildUrl(routes.myPosts.index, filterData));
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
            initialValues: FILTER_INITIAL_VALUES,
            innerRef: formikRef,
            onSubmit: handleSubmit,
          }}
        >
          <Input label={t("labels.title")} name="title" />
          <Select
            isMulti
            label={t("labels.category")}
            name="categories"
            options={getCategoryOptions(categories)}
          />
          <Select
            isClearable
            label={t("labels.status")}
            name="status"
            options={STATUS_OPTIONS}
          />
        </Form>
      </Body>
      <Footer className="space-x-4">
        <Button label={t("labels.done")} onClick={handleSubmitClick} />
        <Button label={t("labels.clearFilters")} style="secondary" />
      </Footer>
    </Pane>
  );
};

export default FilterPane;
