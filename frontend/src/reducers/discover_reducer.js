import { RECEIVE_END_POINTS } from '../action/discover_actions';
import merge from 'lodash/merge';

export const discoverReducer = (state = {}, action) {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_END_POINTS:
      let _newState = merge({}, state)
      return state[endPoints] = action.endPoints

    default:
      return state
  }
}