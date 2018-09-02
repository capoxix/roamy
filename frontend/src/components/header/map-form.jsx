import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Route, Redirect, Switch, Link, HashRouter, withRouter} from 'react-router-dom';
import Help from './help';

class ButtonAppBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: "",
      time: 15
    };
  }

  componentWillMount(){
    this.props.removeErrors();
  }

  render(){
    console.log(this.props);
    if (!this.props.currentUser.id){
    return (
      <div className="appbar">
        <AppBar position="static">
          <Toolbar>
            <Help/>
            <Typography variant="title" color="inherit">
              <Link className="navBarLink" to={"/"} onClick={()=>this.props.removeErrors()}>Roamy</Link>
            </Typography>

            <Typography variant="title" color="inherit">
              <Link className="navBarLink" to={"/signup"} onClick={()=>this.props.removeErrors()}>Sign Up</Link>
            </Typography>
            <Typography variant="title" color="inherit">
              <Link className="navBarLink" to={"/login"} onClick={()=>this.props.removeErrors()}>Log In</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )}else{
    return (
      <div className="appbar">
        <AppBar position="static">
          <Toolbar>
            <Help/>
            <Typography variant="title" color="inherit">
              <Link className="navBarLink" to={"/"}>Roamy</Link>
            </Typography>

            <div>
              Hello {this.props.name}!
            </div>

          <Link className="navBarLink" to="/" onClick={()=> this.props.logout()}>Log Out</Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
  }
};

export default ButtonAppBar;
