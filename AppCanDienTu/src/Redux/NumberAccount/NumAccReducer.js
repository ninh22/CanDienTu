/* eslint-disable prettier/prettier */
import {GET_NUMACC, REDUCE_NUMACC} from './NumAccActionTypes';

//initializing state
let initialState = null;

const numAccReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NUMACC:
      return (state = action.payload);
    case REDUCE_NUMACC:
      return (state -= 1);
    default:
      return state;
  }
};

export default numAccReducer;
