import {RECEIVE_FAVORITE_POINTS, RECEIVE_TRACKED_INPUT} from '../actions/location_actions';

const locationsReducer = (state = [], action) => {
    Object.freeze(state);
    let newArr = state.slice();

    switch(action.type){
        case RECEIVE_FAVORITE_POINTS:
            return action.favorites;
        case RECEIVE_TRACKED_INPUT:
            newArr.push(action.trackedInput);
            return newArr;
        default:
            return state;
    }
};

export default locationsReducer;