import axios from "axios";
import { t } from "i18next";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { Toastr } from "neetoui";
import { evolve } from "ramda";
import { setToLocalStorage, getFromLocalStorage } from "utils/storage";

const DEFAULT_ERROR_NOTIFICATION = t("errors.defaultNotification");

axios.defaults.baseURL = "/";

const setAuthHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = getFromLocalStorage("authToken");
  const email = getFromLocalStorage("authEmail");
  if (token && email) {
    axios.defaults.headers["X-Auth-Email"] = email;
    axios.defaults.headers["X-Auth-Token"] = token;
  }
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  if (axiosErrorObject.response?.status === 401) {
    setToLocalStorage({ authToken: null, email: null, userId: null });
    setTimeout(() => (window.location.href = "/"), 2000);
  }

  if (axiosErrorObject.message === t("errors.networkError")) {
    Toastr.error(t("errors.noInternetConnection"));
  } else {
    Toastr.error(
      axiosErrorObject.response?.data?.error || DEFAULT_ERROR_NOTIFICATION
    );
  }

  if (axiosErrorObject.response?.status === 423) {
    window.location.href = "/";
  }

  return Promise.reject(axiosErrorObject);
};

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const registerIntercepts = () => {
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );

  axios.interceptors.response.use(
    response => {
      const contentType = response.headers["content-type"] || "";

      if (
        !contentType.includes("application/pdf") &&
        !contentType.includes("application/octet-stream")
      ) {
        handleSuccessResponse(response);
        transformResponseKeysToCamelCase(response);

        return response.data;
      }

      return response;
    },
    error => {
      handleErrorResponse(error);

      return Promise.reject(error);
    }
  );
};

const resetAuthTokens = () => {
  delete axios.defaults.headers["X-Auth-Email"];
  delete axios.defaults.headers["X-Auth-Token"];
};

export { setAuthHeaders, registerIntercepts, resetAuthTokens };
