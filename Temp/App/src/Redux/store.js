/* eslint-disable prettier/prettier */
import {createStore, combineReducers} from 'redux';

import userReducer from './User/UserReducer';
import userGroupReducer from './UserGroup/UserGroupReducer';
import numAccReducer from './NumberAccount/NumAccReducer';

const rootReducer = combineReducers({
  userGroupReducer: userGroupReducer,
  userReducer: userReducer,
  numAccReducer: numAccReducer,
});

const store = createStore(rootReducer);

export default store;
