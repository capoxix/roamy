import {RECEIVE_CURRENT_USER} from '../actions/session_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            return Object.assign(newState, action.currentUser);
        default:
            return state;
    }
}