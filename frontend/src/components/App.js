import React, { Component } from 'react';
import './App.css';
import Directions from './directions.js';
import RegisterFormContainer  from './user/register_form_container';
import LoginFormContainer from './session/login_form_container';
import Header from './header/header';
import HeaderContainer from './header/header_container';
import MapContainer from './map/map_container';

class App extends Component {
  render() {
    return (
      <div className="App-wrapper">
        <header className="App-header">
          <h1 className="App-title">Welcome to Rover!</h1>
        </header>
        <p className="App-intro">
          <div> Me hoping my MERN stack works.</div>
        </p>
        <p className="Directions-intro"><Directions/></p>

        <RegisterFormContainer/>

        <LoginFormContainer/>

        <HeaderContainer/>

        <MapContainer/>



      </div>
    );
  }
}

export default App;
