import axios from "axios";

const fetch = () => axios.get("/organizations");

const create = payload =>
  axios.post("/organizations", {
    organization: payload,
  });

const organizationsApi = { fetch, create };

export default organizationsApi;
