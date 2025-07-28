const routes = {
  root: "/",
  posts: {
    index: "/posts",
    new: "/posts/new",
    show: "/posts/:slug/show",
    edit: "/posts/:slug/edit",
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
