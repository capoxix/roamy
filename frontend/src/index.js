import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {login} from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    window.login = login;
    ReactDOM.render(<App />, root);
    

})
