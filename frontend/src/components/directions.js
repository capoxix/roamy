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
      this.result = response.data;
      window.result=response.data;

    });
  }


  render(){
    return (
      <div>
        <img src="https://cdn.dribbble.com/users/614757/screenshots/1832593/busy-business-guy_dribbble.gif" alt="studyin"/>

      </div>
    )
  }
}

export default Directions;
