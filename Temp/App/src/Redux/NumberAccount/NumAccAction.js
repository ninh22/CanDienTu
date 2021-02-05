/* eslint-disable prettier/prettier */
import {GET_NUMACC, REDUCE_NUMACC} from './NumAccActionTypes';

// Action functions which return action type and
// optional payLoad to burgerReducer

export const getNumAccAction = (parameter) => {
  return {
    type: GET_NUMACC,
    payload: parameter,
  };
};

export const reduceNumAccAction = () => {
  return {
    type: REDUCE_NUMACC,
  };
};
