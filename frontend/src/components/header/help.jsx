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
        <h2>How To Use</h2>
        <div className="directions">
        <div className="1-1">
           Set your starting point by clicking on the map, searching for your favorite burger or even your current location!  
        </div>

        <div className="1-2">
          <img src="http://tse4.mm.bing.net/th?id=OIP.KlbjRykc-rX0K-_YClTK9wHaHa&w=190&h=190&c=8&o=5&pid=1.7"></img>
        </div>

        <div className="2-1">
          <img src="https://tse1.mm.bing.net/th?id=OIP.TAAU5G5Z_vQCM2wJYedbBAHaHa&w=190&h=190&c=8&o=5&pid=1.7"></img>
        </div>

        <div className="2-2">
          Select your time limit on the drop down then click on discover to see where YOU can discover!
          
        </div>
        <div className="3-1">
          Login to pin your favorite locations and see if you can reach your favorite bar within time!
        </div>
        <div className="3-2">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5M0M5Xbl-NY88IO6Hk_1HpytW-7bN0HWePs_bvisPtGKKGx5v"></img>
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
