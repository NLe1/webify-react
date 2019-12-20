import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import logger from "redux-logger";

const middleware = [thunk, logger];

const initialState = {};

const devTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));

export default store;
