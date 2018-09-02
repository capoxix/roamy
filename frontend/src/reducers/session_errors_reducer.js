import {
    RECEIVE_ERRORS,
    RECEIVE_CURRENT_USER,
    REMOVE_SESSION_ERRORS
  } from '../actions/session_actions';

  export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_ERRORS:
        return Object.values(action.errors);
      case RECEIVE_CURRENT_USER:
        return [];
      case REMOVE_SESSION_ERRORS:
        return [];
      default:
        return state;
    }
  };
