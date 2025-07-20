import React from "react";

import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
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
      <Switch>
        <Route exact component={NewPost} path={routes.posts.new} />
        <Route exact component={PostDetails} path={routes.posts.show} />
        <Route exact component={Posts} path={routes.posts.index} />
        <Route exact component={Signup} path={routes.auth.signup} />
        <Route exact component={Login} path={routes.auth.login} />
        <Redirect exact from={routes.root} to={routes.posts.index} />
      </Switch>
    </Router>
  </QueryClientProvider>
);

export default App;
