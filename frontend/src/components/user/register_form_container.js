import {connect} from 'react-redux';
import UserForm from './user_form';
import {register, removeErrors} from '../../actions/session_actions';

const msp = (state, ownProps) => ({
//   errors: state.errors,
  formType: 'Register',
  user: {
    name: '',
    email: '',
    password: '',
    password2: ''},
  errors: state.errors
});

const mdp = (dispatch, ownProps) => ({
  processForm: (user) => dispatch(register(user))
});

export default connect(msp, mdp)(UserForm);
