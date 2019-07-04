import { GET_ERRORS, CLEAR_ERRORS } from "./types";

export const getErrors = err => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: err
  });
};

export const removeErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
