import React from 'react';
import ReactDOM from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/MenuIcon';

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

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
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
