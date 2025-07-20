import axios from "axios";

const create = payload =>
  axios.post("/sessions", {
    login: payload,
  });

const sessionsApi = { create };

export default sessionsApi;
