//testing branch!!!
import * as API from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_SIGNUP_ERRORS = 'RECEIVE_SIGNUP_ERRORS';

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
});

export const register = formUser => dispatch => API.register(formUser)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .fail((errors) => dispatch(receiveErrors(errors.responseJSON)));

export const login = formUser => API.login(formUser)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .fail((errors) => dispatch(receiveErrors(errors.reponseJSON)));