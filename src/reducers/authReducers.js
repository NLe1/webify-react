import { SET_USER, SET_TOKEN, SET_REFRESH_TOKEN } from "../actions/types";

const initialState = {
  access_token: null,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_TOKEN:
      return {
        ...state,
        access_token: action.payload
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refresh_token: action.payload
      };
    default:
      return state;
  }
}
