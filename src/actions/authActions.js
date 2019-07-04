import axios from "axios";

import { SET_USER, SET_TOKEN, GET_ERRORS, CLEAR_ERRORS } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const authenticateUser = access_token => dispatch => {
  if (!access_token) {
    return;
  }
  dispatch(getUser(access_token));
  localStorage.setItem("jwtToken", access_token);
  setAuthToken(access_token);
  dispatch({
    type: SET_TOKEN,
    payload: access_token
  });
};

export const getUser = access_token => dispatch => {
  const config = {
    url: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + access_token }
  };

  axios(config)
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(null);
  dispatch({
    type: SET_USER,
    payload: {}
  });
  dispatch({
    type: SET_TOKEN,
    payload: null
  });
  dispatch({
    type: CLEAR_ERRORS
  });
};
