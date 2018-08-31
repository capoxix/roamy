import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Root from './components/root';
import {login,
    register,
    setAuthToken,
    receiveCurrentUser,
    logoutUser
} from './actions/session_actions';
import configureStore from './store/store';
import {track, getFavorites} from './util/location_api_util';
import jwt_decode from 'jwt-decode';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    window.login = login;
    window.register = register;

    window.track = track;
    // window.currentSession = currentSession;
    let store = configureStore();
    window.dispatch = store.dispatch;
    window.getState = store.getState;
    //check for token
    if (localStorage.jwtToken) {
        // Set auth token header auth
    debugger

        setAuthToken(localStorage.jwtToken);
        // Decode token and get user info and exp
        const decoded = jwt_decode(localStorage.jwtToken);
        // Set user and isAuthenticated
        store.dispatch(receiveCurrentUser(decoded));

        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Logout user
          store.dispatch(logoutUser());
          // Redirect to login
          window.location.href = '/login';
        }
      }
      window.getFavorites = getFavorites;


    ReactDOM.render(<Root store={store}/>, root);


})
