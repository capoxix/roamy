import {connect} from 'react-redux';
import Header from './header';
import {login, logoutUser} from '../../actions/session_actions';
import {Link, withRouter} from 'react-router-dom';

const msp = (state, ownProps) => ({
  formType: 'Login',
  currentUser: state.entities.users
});

const mdp = (dispatch, ownProps) => ({
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logoutUser())
});

export default connect(msp, mdp)(Header);
