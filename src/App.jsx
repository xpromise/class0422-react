import React, { Component, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>loading...</div>}>App...</Suspense>
      </Router>
    );
  }
}
