import React, { Component } from 'react';
import './App.css';
import Directions from './directions.js';
import RegisterFormContainer  from './user/register_form_container';
import LoginFormContainer from './session/login_form_container';
// import Header from './header/header';
// import HeaderContainer from './header/header_container';
import MapContainer from './map/map_container';
import ButtonAppBar from './header/map-form';

class App extends Component {



  render() {
    return (
      <div className="App-wrapper">
        <ButtonAppBar/>
        <RegisterFormContainer/>
        <LoginFormContainer/>
        <MapContainer/>
      </div>
    );
  }
}

export default App;
