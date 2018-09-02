import { connect } from 'react-redux';
import {login, logoutUser, removeErrors} from '../../actions/session_actions';
import {Link, withRouter} from 'react-router-dom';
import MapForm from './map-form';
import '../../styling/header/header.css';
import { withStyles } from '@material-ui/core/styles';

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

const mapStateToProps = (state) => {
  return ({
    formType: 'login',
    currentUser: state.entities.users,
    name: state.entities.users.name
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logoutUser()),
    removeErrors: () => dispatch(removeErrors())
  });
}

const MapFormContainer = connect(mapStateToProps, mapDispatchToProps)(MapForm);

export default withStyles(styles)(MapFormContainer);
