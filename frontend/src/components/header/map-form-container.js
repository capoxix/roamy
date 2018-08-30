import { connect } from 'react-redux';
import {login, logoutUser} from '../../actions/session_actions';
import {Link, withRouter} from 'react-router-dom';
import MapForm from './map-form';
import '../../styling/header/header.css';

const mapStateToProps = (state) => {
  return ({
    formType: 'login',
    currentUser: state.entities.users,
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logoutUser())
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(MapForm);
