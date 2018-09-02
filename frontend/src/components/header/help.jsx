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
        <DialogTitle id="simple-dialog-title">Directions</DialogTitle>

        <div className="helpPoint">
          • For All Users:
        </div>
        <div className="helpPoint">
          1. Set Origin Location (Refer to Step 2)
        </div>
        <div className="helpPoint">
          2. Click on Map, Type Location in SearchBar & Click "Go To Location" button, or Click on "Get Current Location" button
        </div>
        <div className="helpPoint">
          3. Set Timeframe
        </div>
        <div className="helpPoint">
          4. Click "Discover" Button
        </div>
        <div className="helpPoint">
          5. Voila!
        </div>
        <br/>
        <div className="helpPoint">
          • For Logged-in Users:
        </div>
        <div className="helpPoint">
           • Users can set and render their "favorite locations"
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
