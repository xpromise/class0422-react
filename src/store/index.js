import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";
import { isDevlopment } from "../config";

const middleware = isDevlopment
  ? composeWithDevTools(applyMiddleware(thunk))
  : applyMiddleware(thunk);

export default createStore(reducers, middleware);
