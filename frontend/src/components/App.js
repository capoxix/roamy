import React, { Component } from 'react';
import './App.css';
import Directions from './directions.js';

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
        <Header/>
      </div>
    );
  }
}

export default App;
