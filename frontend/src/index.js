import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {login, register, currentSession} from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    window.login = login;
    window.register = register;
    window.currentSession = currentSession;
    ReactDOM.render(<App />, root);
    

})
