import {RECEIVE_FAVORITE_POINTS, RECEIVE_TRACKED_INPUT} from '../actions/location_actions';

const locationsReducer = (state = [], action) => {
    Object.freeze(state);
    let newArr = state.slice();

    switch(action.type){
        case RECEIVE_FAVORITE_POINTS:
            return action.favorites;
        case RECEIVE_TRACKED_INPUT:
            return newArr.push(action.trackedInput);
        default:
            return state;
    }
};

export default locaitonsReducer;