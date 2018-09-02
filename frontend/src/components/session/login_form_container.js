import {connect} from 'react-redux';
import SessionForm from './session_form';
import {login, removeErrors} from '../../actions/session_actions';
import {Link, withRouter} from 'react-router-dom';
import '../../styling/header/header.css';
import '../../index.css';

const msp = (state, ownProps) => ({
  formType: 'Login',
  errors: state.errors
});

const mdp = (dispatch, ownProps) => ({
  processForm: (user) => dispatch(login(user))
});

export default connect(msp, mdp)(SessionForm);
