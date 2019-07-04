import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorsReducer from "./errorsReducer";
import apiReducers from "./apiReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorsReducer,
  api: apiReducers
});
