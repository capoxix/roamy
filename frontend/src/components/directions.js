import React, {Component} from 'react';
const axios = require("axios");

class Directions extends Component {

  constructor(props){
    super(props);
    this.result;
    this.end_address;
  }

  componentDidMount(){
    axios.get(`/directions`)
    .then(response => {
      this.result = response;
      // this.end_address = this.result.routes[0].legs[0].end_address;
    });
  }


  render(){
    if (!this.result) return null;
    console.log(this.result);
    return (
      <div>
        <img src="https://cdn.dribbble.com/users/614757/screenshots/1832593/busy-business-guy_dribbble.gif" alt="studyin"/>

      </div>
    )
  }
}

export default Directions;

//rect.body

//  <div>
  //   Our end location is {this.result.routes[0].legs[0].end_address}
  // </div>