import axios from "axios";

const fetch = params => axios.get("/my-posts", { params });

const bulkDelete = slugs =>
  axios.delete("/my-posts/bulk_delete", {
    data: { bulk_delete: { slugs } },
  });

const myPostsApi = { fetch, bulkDelete };

export default myPostsApi;
