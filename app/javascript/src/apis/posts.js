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

const destroy = ({ slug, quiet }) => {
  const path = quiet ? `/posts/${slug}?quiet` : `/posts/${slug}`;

  return axios.delete(path);
};

const vote = ({ slug, payload }) => {
  const path = `/posts/${slug}/vote`;

  return axios.post(path, {
    vote: payload,
  });
};

const generatePdf = ({ slug }) => axios.post(`/posts/${slug}/pdf`, {});

const download = ({ slug }) =>
  axios.get(`/posts/${slug}/pdf/download`, { responseType: "blob" });

const postsApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  vote,
  generatePdf,
  download,
};

export default postsApi;
