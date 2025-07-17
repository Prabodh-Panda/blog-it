import React from "react";

import Sidebar from "components/commons/Sidebar";
import Posts from "components/Posts";
import PostDetails from "components/Posts/Details";
import NewPost from "components/Posts/New";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ToastContainer />
      <div className="flex h-screen">
        <Sidebar />
        <Switch>
          <Route exact component={NewPost} path={routes.posts.new} />
          <Route exact component={PostDetails} path={routes.posts.show} />
          <Route exact component={Posts} path={routes.posts.index} />
          <Redirect exact from={routes.root} to={routes.posts.index} />
        </Switch>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
