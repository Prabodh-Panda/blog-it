import axios from "axios";

const fetch = params => axios.get("/my-posts", { params });

const myPostsApi = { fetch };

export default myPostsApi;
