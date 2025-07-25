import React from "react";

import { PageLoader } from "components/commons";
import { useSignup } from "hooks/reactQuery/useAuth";
import {
  useCreateOrganization,
  useFetchOrganizations,
} from "hooks/reactQuery/useOrganizations";
import { Button, Typography } from "neetoui";
import { Form, Input, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import { SIGNUP_INITIAL_VALUES, SIGNUP_VALIDATION_SCHEMA } from "./constants";
import { getOrganizationOptions } from "./utils";

const Signup = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const {
    data: { organizations } = {},
    isLoading: isFetchOrganizationsLoading,
  } = useFetchOrganizations();

  const { mutate: createOrganization, isLoading: isCreateOrganizationLoading } =
    useCreateOrganization();

  const { mutate: signup, isLoading: isCreateUserLoading } = useSignup();

  const handleSubmit = data => {
    const payload = {
      ...data,
      organizationId: data.organization.value,
    };

    signup(payload, {
      onSuccess: () => {
        history.push(routes.auth.login);
      },
    });
  };

  const handleCreateOrganization = organizationName => {
    createOrganization({
      name: organizationName,
    });
  };

  if (isFetchOrganizationsLoading) return <PageLoader />;

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50
    px-4 py-12 sm:px-6 lg:px-8 "
    >
      <div className="w-full max-w-md">
        <div className="text-center">
          <Typography className="mb-2 text-gray-700" style="h2" weight="black">
            {t("titles.signUp")}
          </Typography>
          <Button
            label={t("labels.loginNow")}
            style="link"
            to={routes.auth.login}
          />
        </div>
        <Form
          className="mt-8 flex flex-col gap-y-6"
          formikProps={{
            initialValues: SIGNUP_INITIAL_VALUES,
            validationSchema: SIGNUP_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          <Input
            label={t("labels.name")}
            name="name"
            placeholder={t("placeholders.name")}
          />
          <Input
            label={t("labels.email")}
            name="email"
            placeholder={t("placeholders.email")}
            type="email"
          />
          <Input
            label={t("labels.password")}
            name="password"
            placeholder={t("placeholders.password")}
            type="password"
          />
          <Input
            label={t("labels.passwordConfirmation")}
            name="passwordConfirmation"
            placeholder={t("placeholders.password")}
            type="password"
          />
          <Select
            isCreateable
            label={t("labels.organization")}
            name="organization"
            options={getOrganizationOptions(organizations)}
            placeholder={t("placeholders.organization")}
            onCreateOption={handleCreateOrganization}
          />
          <Button
            className="justify-center"
            disabled={isCreateOrganizationLoading || isCreateUserLoading}
            label={t("labels.signUp")}
            type="submit"
          />
        </Form>
      </div>
    </div>
  );
};

export default Signup;
