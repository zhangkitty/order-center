/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  dataSource: {},
  fetchContent: [],
  fetchMethod: [],
  queryString: {
    export_content: '0', // 退货险
    export_method: '0',
    param: null, // XLP5236, LKH5236-ABCDEG
    enter_amount: null,
  },
  // load: false,
  exportLoad: false,  // 导出load
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
        exportLoad: false,
      });
    case TYPES.INIT_COUNTRY:
      return assign({}, state, {
        // load: true,
      });
    case TYPES.INIT_COUNTRY_SUCCESS:
      return assign({}, state, {
        fetchContent: action.data.data.export_content, // 付款凭证
        fetchMethod: action.data.data.export_method, // 按包裹号导出
      //  load: false,
      });
    default:
      return state;
  }
};
export default reducer;

