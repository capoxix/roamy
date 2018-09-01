import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';

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

// //<input
//   type="email"
//   onChange={this.update("email")}
//   value={this.state.email}
//   placeholder="Email Address"
//   />
//
// <input
//   type="password"
//   onChange={this.update("password")}
//   value={this.state.password}
//   placeholder="Password"
//   />
//
            //<input className="submit" type='submit' value='Sign In'/>

  render(){
    return(
      <div className='form-container'>
        <div className='form'>
          <ul className='error'>

          </ul>
          <h1 className="formType">{this.props.formType}</h1>

          <form onSubmit={this.handleSubmit}>

            <TextField
              id="email"
              label="Email"
              value={this.state.email}
              onChange={this.update("email")}
              margin="normal"
              className="textfield"
              />
            <br/>

              <TextField
                id="password"
                label="Password"
                value={this.state.password}
                onChange={this.update("password")}
                margin="normal"
                className="textfield"
                type="password"
                />
              <br/>
                <Button variant="contained" color="primary" type="submit">
                  <i class="far fa-caret-square-right"></i>
                  Submit
                </Button>


          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
