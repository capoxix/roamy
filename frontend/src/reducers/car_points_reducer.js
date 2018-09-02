import { RECEIVE_CAR_END_POINTS } from '../actions/discover_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';

const carPointsReducer = (state = [], action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_CAR_END_POINTS:
      return action.endPoints;
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return state
  }
}
export default carPointsReducer;