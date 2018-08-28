//testing branch!!!
import * as API from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_SIGNUP_ERRORS = 'RECEIVE_SIGNUP_ERRORS';


import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;


export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
});

export const register = formUser => dispatch => API.register(formUser)
    .then((user) => dispatch(receiveCurrentUser(user.data)))
    .catch((errors) => dispatch(receiveErrors(errors.responseJSON)));

export const login = formUser => dispatch => API.login(formUser)
    .then((user) => dispatch(receiveCurrentUser(user.data)))
    .catch((errors) => dispatch(receiveErrors(errors.reponseJSON)));