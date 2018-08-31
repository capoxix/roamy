import { combineReducers } from 'redux';
import carPointsReducer from './car_points_reducer';

export default combineReducers({
  cars: carPointsReducer
});