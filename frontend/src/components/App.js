import React, { Component } from 'react';
import './App.css';
import Directions from './directions.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <code> Me hoping my MERN stack works.</code>
        </p>
        <p className="Directions-intro"><Directions/></p>
      </div>
    );
  }
}

export default App;
