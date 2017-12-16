/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  dataSource: {},
  showType: null,
  fetchContent: [],
  fetchMethod: [],
  queryString: {
    export_content: '0', // 退货险
    export_method: '0',
    param: 'LKH5236-ABCDEG',
  },
  searchLoad: false,
  load: false,
  exportLoad: false,  // 导出load
  loadUpdata: false,
  total: 0,
  tracking_update: null, // 更新运单号返回信息
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.COMMIT:
      return assign({}, state, {
        queryString: assign({}, state.queryString, {
          [action.key]: action.val,
        }),
      });
    case TYPES.CHANGE:
      return assign({}, state, {
        [action.key]: action.val,
      });
    case TYPES.EXPORT:
      return assign({}, state, {
        queryString: action.data,
        exportLoad: true,
      });
    case TYPES.EXPORT_SUCCESS:
      return assign({}, state, {
        dataSource: action.data.data,
        showType: action.data.data.payment_method,
        exportLoad: true,
      });
    case TYPES.INIT_COUNTRY:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_COUNTRY_SUCCESS:
      return assign({}, state, {
        fetchContent: action.data.data.export_content, // 付款凭证
        fetchMethod: action.data.data.export_method, // 按包裹号导出
        load: false,
      });
    default:
      return state;
  }
};
export default reducer;

