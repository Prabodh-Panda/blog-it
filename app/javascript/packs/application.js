import "../stylesheets/application.scss";
import ReactRailsUJS from "react_ujs";

import "../src/common/i18n";

import App from "../src/App";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

initializeLogger();
setAuthHeaders();

const componentsContext = { App };
ReactRailsUJS.getConstructor = name => {
  return componentsContext[name];
};
