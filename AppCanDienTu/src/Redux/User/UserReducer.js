/* eslint-disable prettier/prettier */
import {GET_USER, LOADMORE_USER, DELETE_USER} from './UserActionTypes';

//initializing state
let initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return (state = action.payload);
    case LOADMORE_USER:
      return (state = state.concat(action.payload));
    case DELETE_USER:
      return state.filter((item, index) => index !== action.payload);
    default:
      return state;
  }
};

export default userReducer;
