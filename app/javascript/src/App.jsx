import React from "react";

import NewBlog from "components/Blogs/New";
import ShowBlog from "components/Blogs/Show";
import Sidebar from "components/commons/Sidebar";
import { QueryClientProvider } from "react-query";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "routes";
import queryClient from "utils/queryClient";

import Blogs from "./components/Blogs";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ToastContainer />
      <div className="flex h-screen">
        <Sidebar />
        <Switch>
          <Route exact component={ShowBlog} path={routes.blogs.show} />
          <Route exact component={NewBlog} path={routes.blogs.new} />
          <Route exact component={Blogs} path={routes.blogs.index} />
          <Redirect exact from={routes.root} to={routes.blogs.index} />
        </Switch>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
