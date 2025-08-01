import axios from "axios";

const fetch = params => axios.get("/my-posts", { params });

const bulkDelete = slugs =>
  axios.delete("/my-posts/bulk_delete", {
    data: slugs,
  });

const bulkUpdate = posts =>
  axios.patch("/my-posts/bulk_update", {
    posts,
  });

const myPostsApi = { fetch, bulkDelete, bulkUpdate };

export default myPostsApi;
