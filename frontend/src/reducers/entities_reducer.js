import {combineReducers} from 'redux';
import usersReducer from './users_reducer';
import discoveriesReducer from './discoveries_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    discoveries: discoveriesReducer
  });

export default entitiesReducer;