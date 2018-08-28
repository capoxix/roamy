import React, { Component } from 'react';
import './App.css';
import Directions from './directions.js';
import RegisterFormContainer  from './user/register_form_container';
import LoginFormContainer from './session/login_form_container';

import Header from './header/header';


class App extends Component {
  render() {
    return (
      <div className="App-wrapper">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <code> Me hoping my MERN stack works.</code>
        </p>
        <p className="Directions-intro"><Directions/></p>
<<<<<<< HEAD

        <RegisterFormContainer/>

        <LoginFormContainer/>
=======
        <Header/>
>>>>>>> feac3152c7b6766a7ff4c33a85b3dd94d646d030
      </div>
    );
  }
}

export default App;
