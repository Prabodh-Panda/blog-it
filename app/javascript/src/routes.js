const routes = {
  root: "/",
  posts: {
    index: "/posts",
    new: "/posts/new",
    show: "/posts/:slug/show",
  },
  auth: {
    login: "/login",
    signup: "/signup",
  },
};

export default routes;
