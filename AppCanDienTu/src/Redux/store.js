/* eslint-disable prettier/prettier */
import { createStore, combineReducers } from 'redux';

import userReducer from './User/UserReducer';
import userGroupReducer from './UserGroup/UserGroupReducer';
import numAccReducer from './NumberAccount/NumAccReducer';
import nhanvienReducer from './NhanVien/NhanVienReducer';
import WorkReducer from './CongViec/WorkReducer';
const rootReducer = combineReducers({
  userGroupReducer: userGroupReducer,
  userReducer: userReducer,
  numAccReducer: numAccReducer,

  nhanvienReducer: nhanvienReducer,
  WorkReducer: WorkReducer,

});

const store = createStore(rootReducer);

export default store;
