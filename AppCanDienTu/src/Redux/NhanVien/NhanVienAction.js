import { GET_NHANVIEN, EDIT_NHANVIEN, DELETE_NHANVIEN,LOADMORE_NHANVIEN } from './NhanVienActionTypes';


export const getNhanVienAction = (parameter) => {
  return {
    type: GET_NHANVIEN,
    payload: parameter,
  };
};

export const editNhanVienAction = (parameter) => {
  return {
    type: EDIT_NHANVIEN,
    payload: parameter,
  };
};

export const deleteNhanVienAction = (parameter) => {
  return {
    type: DELETE_NHANVIEN,
    payload: parameter,
  };
};
export const loadmoreNhanVienAction = (parameter) => {
  return {
    type: LOADMORE_NHANVIEN,
    payload: parameter,
  };
};