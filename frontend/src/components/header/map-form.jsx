import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: "",
      time: 15
    };
  }

  render(){
    if (this.props.currentUser !== {}){
    return (
      <div className="appbar">
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Rover
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

            <Button color="inherit">Login</Button>
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
              Rover
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

            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
  }
};

export default withStyles(styles)(ButtonAppBar);


// class Form extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       location: "",
//       time: 15
//     };
//   }
//
//   render() {
//     return (
//       <div className="map-form">
//         <i className="fas fa-bars"></i>
//         <form className="searchBar" onSubmit={() => console.log("submit!")}>
//           <label>
//             <input placeholder="Enter Current Location: "></input>
//           </label>
//
//           <select id="time" name="time">
//             <option value="5" selected="true">5</option>
//             <option value="10">10</option>
//             <option value="15">15</option>
//             <option value="20">20</option>
//             <option value="25">25</option>
//             <option value="30">30</option>
//             <option value="35">35</option>
//             <option value="40">40</option>
//             <option value="45">45</option>
//             <option value="50">50</option>
//             <option value="55">55</option>
//             <option value="60">60</option>
//           </select>
//           <button>Submit</button>
//         </form>
//       </div>
//     )
//   }
//
// }
// export default Form;
