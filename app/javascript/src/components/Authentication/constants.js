import { t } from "i18next";
import * as yup from "yup";

export const SIGNUP_INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  organization: null,
};

export const SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required(t("validations.name.required"))
    .min(3, t("validations.name.min")),

  email: yup
    .string()
    .required(t("validations.email.required"))
    .email(t("validations.email.invalid")),

  password: yup
    .string()
    .required(t("validations.password.required"))
    .min(6, t("validations.password.min")),

  passwordConfirmation: yup
    .string()
    .required(t("validations.passwordConfirmation.required"))
    .oneOf([yup.ref("password")], t("validations.passwordConfirmation.match")),

  organization: yup
    .object({
      label: yup.string().required(),
      value: yup.number().required(),
    })
    .required(t("validations.organization.required")),
});

export const LOGIN_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .required(t("validations.email.required"))
    .email(t("validations.email.invalid")),

  password: yup
    .string()
    .required(t("validations.password.required"))
    .min(6, t("validations.password.min")),
});
