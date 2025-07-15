import { t } from "i18next";
import * as yup from "yup";

export const NEW_CATEGORY_INITIAL_VALUES = {
  name: "",
};

export const NEW_CATEGORY_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(t("validations.categoryNameRequired")),
});
