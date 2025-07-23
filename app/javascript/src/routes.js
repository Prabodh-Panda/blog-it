const routes = {
  root: "/",
  posts: {
    index: "/posts",
    new: "/posts/new",
    show: "/posts/:slug/show",
  },
  myPosts: {
    index: "/my-posts",
  },
  auth: {
    login: "/login",
    signup: "/signup",
  },
};

export default routes;
