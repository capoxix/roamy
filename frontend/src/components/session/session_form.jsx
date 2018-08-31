import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => this.props.history.push('/events'));
  }

  update(field){
    return (e) => (
      this.setState({[field]: e.target.value})
    );
  }

  render(){
    return(
      <div className='form-container'>
        <div className='form'>
          <ul className='error'>

          </ul>
          <h1>{this.props.formType}</h1>

          <form onSubmit={this.handleSubmit}>

            <input
              type="email"
              onChange={this.update("email")}
              value={this.state.email}
              placeholder="Email Address"
              />

            <input
              type="password"
              onChange={this.update("password")}
              value={this.state.password}
              placeholder="Password"
              />


            <input type='submit' value='SIGN IN'/>

          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
