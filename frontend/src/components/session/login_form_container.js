import {connect} from 'react-redux';
import SessionForm from './session_form';
import {login, clearErrors} from '../../actions/session_actions';
import {Link, withRouter} from 'react-router-dom';

const msp = (state, ownProps) => ({
  formType: 'login',
  errors: state.errors
});

const mdp = (dispatch, ownProps) => ({
  processForm: (user) => dispatch(login(user)),
});

export default connect(msp, mdp)(SessionForm);
