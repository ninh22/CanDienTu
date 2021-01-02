/* eslint-disable prettier/prettier */
import {GET_USER, LOADMORE_USER, DELETE_USER} from './UserActionTypes';

// Action functions which return action type and
// optional payLoad to burgerReducer

export const getUserAction = (parameter) => {
  return {
    type: GET_USER,
    payload: parameter,
  };
};

export const loadMoreUserAction = (parameter) => {
  return {
    type: LOADMORE_USER,
    payload: parameter,
  };
};

export const deleteUserAction = (parameter) => {
  return {
    type: DELETE_USER,
    payload: parameter,
  };
};
