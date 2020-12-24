/* eslint-disable prettier/prettier */
import {createStore, combineReducers} from 'redux';

import userReducer from './User/UserReducer';
import userGroupReducer from './UserGroup/UserGroupReducer';

const rootReducer = combineReducers({
  userGroupReducer: userGroupReducer,
  userReducer: userReducer,
});

const store = createStore(rootReducer);

export default store;
