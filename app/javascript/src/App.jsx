import React from "react";

import Sidebar from "components/commons/Sidebar";
import { QueryClientProvider } from "react-query";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import routes from "routes";
import queryClient from "utils/queryClient";

import Blogs from "./components/Blogs";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <Switch>
          <Route exact component={Blogs} path={routes.blogs.index} />
          <Redirect exact from={routes.root} to={routes.blogs.index} />
        </Switch>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
