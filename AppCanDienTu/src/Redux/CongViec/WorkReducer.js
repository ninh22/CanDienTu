import { GET_WORK, DETAIL_WORK, EDIT_WORK, DELETE_WORK } from './WorkActionTypes';

//initializing state
var defaultState = {
    arrayListWork:[
        {id_lichLV:1,id_NV:'NV-00022155',id_CV:'llll',thoigian_LV:'15:30 02/10/2021',diadiem_LV:'Trai dat',mota_LV:'công việc nhẹ nhàng lương cao'},
        {id_lichLV:2,id_NV:'NV-00022155',id_CV:'llll',thoigian_LV:'15:30 02/10/2021',diadiem_LV:'Trai dat',mota_LV:'công việc nhẹ nhàng lương cao'},
        {id_lichLV:3,id_NV:'NV-00022155',id_CV:'llll',thoigian_LV:'15:30 02/10/2021',diadiem_LV:'Trai dat',mota_LV:'công việc nhẹ nhàng lương cao'},
        {id_lichLV:4,id_NV:'NV-00022155',id_CV:'llll',thoigian_LV:'15:30 02/10/2021',diadiem_LV:'Trai dat',mota_LV:'công việc nhẹ nhàng lương cao'},
        {id_lichLV:5,id_NV:'NV-00022155',id_CV:'llll',thoigian_LV:'15:30 02/10/2021',diadiem_LV:'Trai dat',mota_LV:'công việc nhẹ nhàng lương cao'},
    ],
};

const WorkReducer = (state = defaultState, action) => {
    return state;
};

export default WorkReducer;