/* eslint-disable prettier/prettier */
import {GET_USERGROUP, LOADMORE_USERGROUP} from './UserGroupActionTypes';

//initializing state
let initialState = null;

const userGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERGROUP:
      return (state = action.payload);
    case LOADMORE_USERGROUP:
      return (state = state.concat(action.payload));
    // case DECREASE_BURGER:return{
    // 	...state,
    // 	numberOfBurger:state.numberOfBurger-1
    // }
    default:
      return state;
  }
};

export default userGroupReducer;
