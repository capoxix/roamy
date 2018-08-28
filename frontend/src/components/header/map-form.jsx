import React from 'react';
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        location: "",
        time: 15
    };
  }
  render() {
    return (
    <div className="map-form"> 
  
      <form onSubmit={() => console.log("submit!")}>
        <label>Location:
          <input value="location"></input>
        </label>

        <label className="time-label">Time:
          <input value="15"></input>
        </label>
      </form>
    </div>
    )
  }
      
}
export default Form;