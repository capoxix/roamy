import { RECEIVE_CAR_END_POINTS } from '../actions/discover_actions';

const carPointsReducer = (state = [], action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_CAR_END_POINTS:
      return action.endPoints

    default:
      return state
  }
}
export default carPointsReducer;