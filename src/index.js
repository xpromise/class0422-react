import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";

// redux
import store from "./store";
// rem适配
import "./utils/flexible";

import "./assets/css/reset.css";
import "./assets/css/iconfont.css";
import "@assets/css/common.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
