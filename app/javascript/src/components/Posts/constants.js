import { t } from "i18next";
import * as yup from "yup";

export const MAX_TITLE_LENGTH = 125;
export const MAX_DESCRIPTION_LENGTH = 10000;

export const NEW_POST_INITIAL_VALUES = {
  title: "",
  categories: [],
  description: "",
};

export const NEW_POST_VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .required(t("validations.titleRequired"))
    .max(
      MAX_TITLE_LENGTH,
      t("validations.titleMaxLength", { max: MAX_TITLE_LENGTH })
    ),
  description: yup
    .string()
    .required(t("validations.descriptionRequired"))
    .max(
      MAX_DESCRIPTION_LENGTH,
      t("validations.descriptionMaxLength", { max: MAX_DESCRIPTION_LENGTH })
    ),
  categories: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.number().required(),
      })
    )
    .min(1, t("validations.atLeastOneCategoryRequired"))
    .required(t("validations.categoryRequired")),
});
