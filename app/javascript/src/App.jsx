import React from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import Blogs from "./components/Blogs";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={Blogs} path="/blogs" />
      <Redirect exact from="/" to="/blogs" />
    </Switch>
  </Router>
);

export default App;
