import { connect } from 'react-redux';
import {login, logoutUser} from '../../actions/session_actions';
import {Link, withRouter} from 'react-router-dom';
import MapForm from './map-form';
import '../../styling/header/header.css';

const mapStateToProps = (state) => {
  formType: 'login',
  currentUser: state.entities.users
  return ({});
}

const mapDispatchToProps = (dispatch) => {
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logoutUser())
  return ({});
}

export default connect(mapStateToProps, mapDispatchToProps)(MapForm);
