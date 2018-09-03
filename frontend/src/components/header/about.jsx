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
        <div className="info">
          <div className="1-1">
            Roamy is a single page web-application used to render a bubble that represents the area that a user can travel to, by car, considering the time they have at their disposal.
          </div>

          <div className="1-2">
            <img src="https://www.mavenwave.com/wp-content/uploads/2016/07/locate.png"></img>
          </div>

          <div className="2-1">
            <img src="https://www.mavenwave.com/wp-content/uploads/2016/07/engage.png"></img>
          </div>

          <div className="2-2">
            The bubble is dynamically updated using Google's Distance Matrix API.
          </div>
          <div className="3-1">
            The user can also label their favorite points on the map and show the favorite points that are currently inside their travel bubble.
          </div>

          <div className="3-2">
            <img src="https://www.mavenwave.com/wp-content/uploads/2016/07/act.png"></img>
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

class About extends React.Component {
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
          <Button onClick={this.handleClickOpen}>About</Button>
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

export default About;
