import React, { Component } from 'react';
import './App.css';
import Directions from './directions.js';
import RegisterFormContainer  from './user/register_form_container';
import LoginFormContainer from './session/login_form_container';
// import Header from './header/header';
// import HeaderContainer from './header/header_container';
import MapContainer from './map/map_container.js';
import ButtonAppBar from './header/map-form-container';
import Footer from './footer/footer';
import Splash from './splash/splash';
import { AuthRoute, ProtectedRoute} from '../util/route_util';
import {Route, Redirect, Switch, Link, HashRouter} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App-wrapper">
        <ButtonAppBar/>
        <Switch>
          <Route exact path="/" component={Splash}/>
          <AuthRoute exact path="/signup" component= {RegisterFormContainer}/>
          <AuthRoute exact path="/login" component={LoginFormContainer}/>
          <MapContainer/>
        </Switch>
      </div>
    );
  }
}

export default App;
