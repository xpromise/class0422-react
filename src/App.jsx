import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routes from "./config/routes";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            {routes.map((route) => {
              return <Route key={route.path} {...route} />;
            })}
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
