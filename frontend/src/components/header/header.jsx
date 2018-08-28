import React from 'react';

import MapForm from './map-form';

class Header extends React.Component {

  constructor(props) {
    super(props)


  }

  render() {
    return (
      <div className="header-wrapper">

        <div className="">
          Possible Dropdown here for regular shtuff
        </div>

        <div className="map-form-wrapper">
          <MapForm/> 
        </div>
      </div>
    )
  }
}

export default Header;