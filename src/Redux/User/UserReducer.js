/* eslint-disable prettier/prettier */
import {GET_USER, LOADMORE_USER} from './UserActionTypes';

//initializing state
let initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return (state = action.payload);
    case LOADMORE_USER:
      return (state = state.concat(action.payload));
    // case DECREASE_BURGER:return{
    // 	...state,
    // 	numberOfBurger:state.numberOfBurger-1
    // }
    default:
      return state;
  }
};

export default userReducer;
