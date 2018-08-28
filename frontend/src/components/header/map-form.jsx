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
    <div className="SearchForm"> 
  
      <form onSubmit={() => console.log("submit!")}>
        <label>Location:
          <input value="dd"></input>
        </label>

        <label>Time:
          <input value="dd"></input>
        </label>
      </form>
    </div>
    )
  }
      
}
export default Form;