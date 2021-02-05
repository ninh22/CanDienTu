import { GET_NHANVIEN, EDIT_NHANVIEN, DELETE_NHANVIEN } from './NhanVienActionTypes';

//initializing state
let initialState = {
  arrayListNhanVien:[],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NHANVIEN:
      return (state = action.payload);
    case EDIT_NHANVIEN:
      return state;
    case DELETE_NHANVIEN:
      return state;
    default:
      return state;
  }
};

export default userReducer;