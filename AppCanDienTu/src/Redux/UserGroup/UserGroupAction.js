/* eslint-disable prettier/prettier */
import {GET_USERGROUP, LOADMORE_USERGROUP} from './UserGroupActionTypes';

// Action functions which return action type and
// optional payLoad to burgerReducer

export const getUserGroupAction = (parameter) => {
  return {
    type: GET_USERGROUP,
    payload: parameter,
  };
};

export const loadMoreUserGroupAction = (parameter) => {
  return {
    type: LOADMORE_USERGROUP,
    payload: parameter,
  };
};
