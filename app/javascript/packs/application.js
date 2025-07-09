import "../stylesheets/application.scss";

import { initializeLogger } from "../src/common/logger";
import { setAuthHeaders } from "apis/axios";

initializeLogger();
setAuthHeaders();
