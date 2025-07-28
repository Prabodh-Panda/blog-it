import React from "react";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Posts from "components/Posts";
import PostDetails from "components/Posts/Details";
import NewPost from "components/Posts/New";
import { either, isEmpty, isNil } from "ramda";
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
import { getFromLocalStorage } from "utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact component={Signup} path={routes.auth.signup} />
          <Route exact component={Login} path={routes.auth.login} />
          <PrivateRoute
            component={NewPost}
            condition={isLoggedIn}
            path={routes.posts.new}
            redirectRoute={routes.auth.login}
          />
          <PrivateRoute
            component={PostDetails}
            condition={isLoggedIn}
            path={routes.posts.show}
            redirectRoute={routes.auth.login}
          />
          <PrivateRoute
            component={Posts}
            condition={isLoggedIn}
            path={routes.posts.index}
            redirectRoute={routes.auth.login}
          />
          <Redirect exact from={routes.root} to={routes.posts.index} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
