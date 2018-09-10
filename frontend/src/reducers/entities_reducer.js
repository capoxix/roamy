import {combineReducers} from 'redux';
import usersReducer from './users_reducer';
import discoveriesReducer from './discoveries_reducer';
import locationsReducer from './locations_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    discoveries: discoveriesReducer,
    locations: locationsReducer
  });

export default entitiesReducer;