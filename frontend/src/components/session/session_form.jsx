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
    this.props.processForm(user).then(() => this.props.history.push('/login'));
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


  render(){
    return(
      <div className='form-container'>
        <MuiThemeProvider theme={theme}>
        <div className='form'>
          <ul className='error'>

          </ul>
          <h1 className="formType">{this.props.formType}</h1>
          {this.renderErrors()}
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
                <Button variant="contained" color="primary" type="submit" color="primary">
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

export default withRouter(SessionForm);
