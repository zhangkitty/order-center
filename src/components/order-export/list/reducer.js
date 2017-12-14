/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  dataSource: [],
  fetchSite: [],  // 站点
  fetchCountry: [], // 国家
  fetchMember: [], // 会员等级
  fetchWarehouse: [], // 仓库
  fetchInsurance: [], // 是否购买退货险
  fetchReturn: [], // 退货单状态
  fetchTrouble: [],  // 是否问题件
  fetchShipping: [],  // 包裹状态
  fetchReturnType: [],  // 运单类型
  fetchReturnStatus: [],  // 退款状态
  fetchOrderType: [],   // 退货单类型
  fetchPayment: [],   // 是否COD
  fetchTimeTag: [],   // 时间标识
  exportData: null,
  queryString: {
    return_order_status: '0', // 退货险
    trouble_state: '0',
    return_order_id: null,
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
    case TYPES.SEARCH:
      return assign({}, state, {
        queryString: action.data,
        searchLoad: true,
      });
    case TYPES.SEARCH_SUCCESS:
      return assign({}, state, {
        dataSource: action.data.data || [],
        total: action.data.total,
        searchLoad: false,
      });
    case TYPES.EXPORT:
      return assign({}, state, {
        queryString: action.data,
        exportLoad: true,
      });
    case TYPES.INIT_COUNTRY:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_COUNTRY_SUCCESS:
      return assign({}, state, {
        fetchReturn: action.data.data.return_order_status, // 退货单状态
        fetchTrouble: action.data.data.trouble_status, // 是否问题件
        load: false,
      });
    default:
      return state;
  }
};
export default reducer;

