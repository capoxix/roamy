import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Route, Redirect, Switch, Link, HashRouter, withRouter} from 'react-router-dom';


class ButtonAppBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: "",
      time: 15
    };
  }



  render(){
    console.log(this.props);
    if (!this.props.currentUser.id){
    return (
      <div className="appbar">
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              <Link className="navBarLink" to={"/"}>Roamy</Link>
            </Typography>

            <div className="map-form">
              <form className="searchBar" onSubmit={() => console.log("submit!")}>
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

            <Typography variant="title" color="inherit">
              <Link className="navBarLink" to={"/signup"}>Sign Up</Link>
            </Typography>
            <Typography variant="title" color="inherit">
              <Link className="navBarLink" to={"/login"}>Log In</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )}else{
    return (
      <div className="appbar">
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              <Link className="navBarLink" to={"/"}>Roamy</Link>
            </Typography>

            <div className="map-form">
              <form className="searchBar" onSubmit={() => console.log("submit!")}>
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

          <Link className="navBarLink" to="/" onClick={()=> this.props.logout()}>Log Out</Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
  }
};

export default ButtonAppBar;
