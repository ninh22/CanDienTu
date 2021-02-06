
import { GET_NHANVIEN, EDIT_NHANVIEN, DELETE_NHANVIEN, LOADMORE_NHANVIEN } from './NhanVienActionTypes';

//initializing state
let initialState = [];

const nhanvienReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NHANVIEN:
      return (state = action.payload);
      break;
    case EDIT_NHANVIEN:
      return state;
      break;
    case DELETE_NHANVIEN:
      return state;
      break;
    case LOADMORE_NHANVIEN:
      console.log(state)
      return (state = state.concat(action.payload));
      break;

    default:
      return state;
  }
};


export default nhanvienReducer;

