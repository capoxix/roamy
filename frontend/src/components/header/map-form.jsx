import React from 'react';
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      time: 15
    };
    this.myFunction=this.myFunction.bind(this);
  }

  myFunction() {
    var x = document.getElementById("Demo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }

  render() {
    return (
      <div className="map-form">
        <i class="fas fa-bars"></i>
        <form onSubmit={() => console.log("submit!")}>
          <label>
            <input placeholder="Enter Current Location: "></input>
          </label>

          <select id="time" name="time">
            <option value="5" selected="true">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
            <option value="55">55</option>
            <option value="60">60</option>
          </select>
          <button>Submit</button>
        </form>
      </div>
    )
  }

}
export default Form;
