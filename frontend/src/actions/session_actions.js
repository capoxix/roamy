//testing branch!!!
import * as API from '../util/session_api_util';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const $ = window.$;
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_SIGNUP_ERRORS = 'RECEIVE_SIGNUP_ERRORS';
export const REMOVE_SESSION_ERRORS = 'REMOVE_SESSION_ERRORS';

//set default header
export const setAuthToken = token => {


  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};


export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
});

export const removeErrors = () => ({
  type: REMOVE_SESSION_ERRORS
});

export const register = formUser => dispatch => API.register(formUser)
    .then(res => {
        // Save to localStorage

        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        console.log('inside action decoded:', decoded)
        dispatch(receiveCurrentUser(decoded));
        return "successful";
    })
    .catch((errors) => {
       dispatch(receiveErrors(errors.response.data));
       return "fail";
    });


export const login = formUser => dispatch => API.login(formUser)
    .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(receiveCurrentUser(decoded));
        return "successful";
    })
    .catch((errors) => {
        dispatch(receiveErrors(errors.response.data));
        return "fail";
    });

    // Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(receiveCurrentUser({}));
  };
