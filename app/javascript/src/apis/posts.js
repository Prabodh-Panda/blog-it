import axios from "axios";

const fetch = params => axios.get("/posts", { params });

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const show = slug => axios.get(`/posts/${slug}`);

const update = ({ slug, payload, quiet = false }) => {
  const path = quiet ? `/posts/${slug}?quiet` : `/posts/${slug}`;

  return axios.put(path, {
    post: payload,
  });
};

const postsApi = { fetch, create, show, update };

export default postsApi;
