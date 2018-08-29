import React from 'react';

import MapForm from './map-form';
import '../../styling/header/header.css';

class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props);
    if(!this.props.currentUser.id)
      return (
        <div className="header-wrapper">

          <div className="map-form-wrapper">
            <MapForm/>
          </div>

          <div className="login-wrapper">
            <button>Login</button>
          </div>
        </div>
      );
    if(this.props.currentUser.id)
      return(
        <div className="header-wrapper">
          <div className="user">
            <p>Hello, {this.props.currentUser.name}</p>
          </div>

          <div className="map-form-wrapper">
            <MapForm/>
          </div>

          <div className="login-wrapper">
            <button onClick={() => this.props.logout()}>Logout</button>
          </div>
        </div>
      );
  }
}

export default Header;
