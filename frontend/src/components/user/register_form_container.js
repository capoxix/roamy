import {connect} from 'react-redux';
import UserForm from './user_form';
import {register} from '../../actions/session_actions';

const msp = (state, ownProps) => ({
//   errors: state.errors,
  formType: 'register',
  user: {
    name: '',
    email: '',
    password: '',
    password2: ''},
  errors: state.errors
});

const mdp = (dispatch, ownProps) => ({
  processForm: (user) => dispatch(register(user)),
//   clearErrors: () => dispatch(clearErrors())
});

export default connect(msp, mdp)(UserForm);
