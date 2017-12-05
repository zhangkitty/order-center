/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
// import moment from 'moment';
import * as TYPES from './types';


const defaultState = {
  queryString: {
    billno: '',
    package_no: '',
    user_name: '',
    commitTime: [],
    status: '',
    site_from: '',
    ship_method: '',
    payment_method: '',
    is_delete: '',
    type: '',
    current: 1,
    page_size: 10,
  },
  loadding1: false,
  loadding2: false,
  initData: {
    status: [],
    site_from: [],
    payment_method: [],
    is_delete: [],
    type: [],
  },
  total: 0,
  dataList: [],
};


const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.COMMIT:
      return assign({}, state, {
        queryString: assign({}, state.queryString, {
          [action.key]: action.val,
        }),
      });
    case TYPES.SEARCH_SUCCESS:
      return assign({}, state, {
        initData: {
          status: action.data.data.status || [],
          site_from: action.data.data.site_from || [],
          payment_method: action.data.data.payment_method || [],
          is_delete: action.data.data.is_delete || [],
          type: action.data.data.type || [],
        },
      });
    case TYPES.SEARCHLIST:
      return assign({}, state, {
        loadding1: true,
      });
    case TYPES.SEARCHLIST_FAIL:
      return assign({}, state, {
        loadding1: false,
      });
    case TYPES.SEARCHLIST_SUCCESS:
      return assign({}, state, {
        dataList: action.data.data,
        total: action.data.total,
        loadding1: false,
      });
    case TYPES.DELETESUCCESS:
      let temp = state.dataList;
      temp[action.data.myIndex] = action.data.data.data[0];
      return assign({}, state, {
        loadding1: false,
        dataList: temp,
      });
    case TYPES.DELETEFAIL:
      return assign({}, state, {
        loadding1: false,
      });
    case TYPES.DELETEORDER:
      return assign({}, state, {
        loadding1: true,
      });
    case TYPES.AUDITORDER:
      return assign({}, state, {
        loadding1: true,
      });
    case TYPES.PROCESSORDER:
      return assign({}, state, {
        loadding1: true,
      });
    case TYPES.RECHECKORDER:
      return assign({}, state, {
        loadding1: true,
      });
    case TYPES.RECHECKSUCCESS:
      let temp1 = state.dataList;
      temp1[action.data.myIndex] = action.data.data.data[0];
      return assign({}, state, {
        loadding1: false,
        dataList: temp1,
      });
    case TYPES.RECHECKFAIL:
      return assign({}, state, {
        loadding1: false,
      });
    case TYPES.PROCESSSUCCESS:
      let temp2 = state.dataList;
      temp2[action.data.myIndex] = action.data.data.data[0];
      return assign({}, state, {
        loadding1: false,
        dataList: temp2,
      });
    case TYPES.PROCESSFAIL:
      return assign({}, state, {
        loadding1: false,
      });
    case TYPES.AUDITSUCCESS:
      let temp3 = state.dataList;
      temp3[action.data.myIndex] = action.data.data.data[0];
      return assign({}, state, {
        loadding1: false,
        dataList: temp3,
      });
    case TYPES.AUDITFAIL:
      return assign({}, state, {
        loadding1: false,
      });
    case TYPES.BATCHDELETESUCCESS:
      let temp4 = state.dataList;
      action.data.data.map((k)=>{
        temp4.map((m, index)=>{
          if(m.id == k.id){
            temp4[index] = k;
          }
        })
      });
      return assign({}, state, {
        loadding1: false,
        dataList: temp4,
      });
    case TYPES.BATCHDELETEFAIL:
      return assign({}, state, {
        loadding1: false,
      });
    case TYPES.BATCHDELETE:
      return assign({}, state, {
        loadding1: true,
      });
    case TYPES.BATCHRECHECKSUCCESS:
      let temp5 = state.dataList;
      action.data.data.map((k)=>{
        temp5.map((m, index)=>{
          if(m.id == k.id){
            temp5[index] = k;
          }
        })
      });
      return assign({}, state, {
        loadding1: false,
        dataList: temp5,
      });
    case TYPES.BATCHRECHECKFAIL:
      return assign({}, state, {
        loadding1: false,
      });
    case TYPES.BATCHRECHECK:
      return assign({}, state, {
        loadding1: true,
      });
    default:
      return state;
  }
};
export default reducer;

