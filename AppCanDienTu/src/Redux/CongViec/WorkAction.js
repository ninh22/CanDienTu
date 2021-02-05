import { GET_WORK, DETAIL_WORK, EDIT_WORK, DELETE_WORK } from './WorkActionTypes';

// Action functions which return action type and
// optional payLoad to burgerReducer

export const getWorkAction = (parameter) => {
    return {
        type: GET_WORK,
        payload: parameter,
    };
};

export const getDetailWork = (parameter) => {
    return {
        type: DETAIL_WORK,
        payload: parameter,
    };
};

export const editWorkAction = (parameter) => {
    return {
        type: EDIT_WORK,
        payload: parameter,
    };
};
export const deleteWorkAction = (parameter) => {
    return {
        type: DELETE_WORK,
        payload: parameter,
    };
};