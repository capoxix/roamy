import React from 'react';

import MapForm from './map-form';
import '../../styling/header/header.css';

class Header extends React.Component {

  constructor(props) {
    super(props)


  }

  render() {
    return (
      <div className="header-wrapper">

        <div className="drop-down-wrapper">
          Possible Dropdown here for regular shtuff
        </div>

        <div className="map-form-wrapper">
          <MapForm/> 
        </div>

        <div className="login-wrapper">
          <button>Login</button>
        </div>
      </div>
    )
  }
}

export default Header;