import React from "react";

import { useLogin } from "hooks/reactQuery/useAuth";
import { Button, Typography } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import routes from "routes";

import { LOGIN_INITIAL_VALUES, LOGIN_VALIDATION_SCHEMA } from "./constants";

const Login = () => {
  const { t } = useTranslation();

  const { mutate: login, isLoading } = useLogin();

  const handleSubmit = payload => {
    login(payload, {
      onSuccess: () => {
        window.location.href = routes.posts.index;
      },
    });
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50
    px-4 py-12 sm:px-6 lg:px-8 "
    >
      <div className="w-full max-w-md">
        <div className="text-center">
          <Typography className="mb-2 text-gray-700" style="h2" weight="black">
            {t("titles.login")}
          </Typography>
          <Button
            label={t("labels.signUpNow")}
            style="link"
            to={routes.auth.signup}
          />
        </div>
        <Form
          className="mt-8 flex flex-col gap-y-6"
          formikProps={{
            initialValues: LOGIN_INITIAL_VALUES,
            validationSchema: LOGIN_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
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
          <Button
            className="justify-center"
            disabled={isLoading}
            label={t("labels.login")}
            type="submit"
          />
        </Form>
      </div>
    </div>
  );
};

export default Login;
