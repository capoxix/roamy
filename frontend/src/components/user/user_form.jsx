import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[900] }, // Purple and green play nicely together.
    // secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

class UserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  update(field){
    return (e) => (
      this.setState({[field]: e.target.value})
    );
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  // // //  <input
  // //     type="text"
  // //     onChange={this.update("name")}
  // //     value={this.state.name}
  // //     placeholder="Username"
  // //     />
  //
  // <input
  //   type="email"
  //   onChange={this.update("email")}
  //   value={this.state.email}
  //   placeholder="Email address"
  //   />
  //
  // <input
  //   type="password"
  //   onChange={this.update("password")}
  //   value={this.state.password}
  //   placeholder="Password"
  //   />
  //
  //
  // <input
  //   type="password"
  //   onChange={this.update("password2")}
  //   value={this.state.password2}
  //   placeholder="Confirm Password"
  //   />

  //  <input className="submit" type='submit' value="Register"/>

  render(){
    <Link to = '/login'>If you've already done this before, click here to log in</Link>;

      return(
        <div className= "form-container">
          <MuiThemeProvider theme={theme}>
          <div className="form">
            <ul className="error">
            </ul>
            <h1 className="formType">{this.props.formType}</h1>
              {this.renderErrors()}
            <form onSubmit={this.handleSubmit}>

              <TextField
                id="name"
                label="Username"
                value={this.state.name}
                onChange={this.update("name")}
                margin="normal"
                className="textfield"
                />
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

              <TextField
                id="password2"
                label="Confirm Password"
                value={this.state.password2}
                onChange={this.update("password2")}
                margin="normal"
                className="textfield"
                type="password"
                />

              <Button variant="contained" color="primary" type="submit">
                <i className="far fa-caret-square-right"></i>
                Submit
              </Button>

            </form>

          </div>
        </MuiThemeProvider>
        <br/>
        </div>
      );
    }
  }

  export default withRouter(UserForm);
