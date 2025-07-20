import axios from "axios";

const create = payload =>
  axios.post("/users", {
    user: payload,
  });

const usersApi = { create };

export default usersApi;
