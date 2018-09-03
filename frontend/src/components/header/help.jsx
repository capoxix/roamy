import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import '../../styling/header/header.css';
import '../../index.css';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <div className="directions">
        <div className="1-1">
          Set Origin Location, by either clicking the "Get Current Location" button, typing in location and clicking on "Go To Location" button, or simply by clicking on the map.
        </div>

        <div className="1-2">
          <img src="http://tse4.mm.bing.net/th?id=OIP.KlbjRykc-rX0K-_YClTK9wHaHa&w=190&h=190&c=8&o=5&pid=1.7"></img>
        </div>

        <div className="2-1">
          <img src="https://tse1.mm.bing.net/th?id=OIP.TAAU5G5Z_vQCM2wJYedbBAHaHa&w=190&h=190&c=8&o=5&pid=1.7"></img>
        </div>

        <div className="2-2">
          Select timeframe available.
        </div>
        <div className="3-1">
          Click "Discover" Button to fire off your search and enjoy!
        </div>
        <div className="3-2">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5M0M5Xbl-NY88IO6Hk_1HpytW-7bN0HWePs_bvisPtGKKGx5v"></img>
        </div>
        <div className="5-1">
          <img src="https://tse4.mm.bing.net/th?id=OIP.9_WA93uE6tx2Poz_J6IzKAHaHa&w=190&h=190&c=8&o=5&pid=1.7"></img>
        </div>
        <div className="5-2">
           Logged in users have the additional option to set and view their favorite locations.
        </div>
      </div>

      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class Help extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <div>
        <div className="howToUse">
        <Button onClick={this.handleClickOpen}>How To Use</Button>
        </div>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Help;
