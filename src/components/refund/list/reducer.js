/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import moment from 'moment';
import * as TYPES from './types';

const defaultState = {
  batchChooseOrder: [],
  batchChooseGoods: [],
  fetchgoodSize: [],
  dataSource: [],
  fetchType: [],    // 退款单类型列表
  fetchPath: [],    // 退款路径列表
  fetchPathStatus: [],    // 退款路径状态列表  =  退款记录状态
  fetchSite: [],    // 站点列表
  fetchCountry: [],    // 国家列表
  fetchMember: [],    // 会员等级列表
  fetchStatus: [],    // 退款单状态列表
  fetchRefund: [],
  queryString: {
    pageSize: 10,
    pageNumber: 1,
    refund_bill_id: null,
    billno: null,
    email: null,
    add_user: null,
    handle_user: null,
    refund_bill_type: null,
    refund_bill_status: null,
    refund_path_id: null,
    refund_path_status: null,
    site_from: null,
    apply_start_time: null,
    apply_end_time: null,
    country_id: null,
    member_level: null,
    refund_start_time: null,
    refund_end_time: null,
    sorting_rule: 0,
  },
  searchLoad: false,
  load: false,
  loadUpdata: false,
  total: 0,
  waitTotal: null,
  rejectTotal: null,
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
    case TYPES.SEARCH_FAIL:
      return assign({}, state, {
        searchLoad: false,
      });
    case TYPES.SEARCH_SUCCESS:
      const wantedList = [];
      action.data.data.refund_bill_list.map((k) => {
        k.refund_record_list.map((m, index) => {
          const temp = m;
          temp.refund_bill_id = k.refund_bill_id;
          if (index === 0) {
            temp.rowSpan = k.refund_record_list.length;
          } else {
            temp.rowSpan = 0;
          }
          wantedList.push(temp);
        });
      });
      return assign({}, state, {
        // dataSource: action.data.data.refund_bill_list.map((v, i) => assign({}, v, { key: i })),
        dataSource: wantedList,
        total: action.data.data.total_refund_bill_number,  // 总退款单数
        waitTotal: action.data.data.wait_refund_bill_number, // 等待退款单数
        rejectTotal: action.data.data.reject_refund_bill_number, // 驳回退款单数
        searchLoad: false,
      });
    case TYPES.INIT_COUNTRY:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_COUNTRY_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_COUNTRY_SUCCESS:
      return assign({}, state, {
        fetchType: action.data.data.refund_bill_type_list || [],
        fetchStatus: action.data.data.refund_bill_status_list || [],
        fetchPath: action.data.data.refund_path_list || [],
        fetchPathStatus: action.data.data.refund_path_status_list || [],
        fetchSite: action.data.data.site_list || [],
        fetchCountry: action.data.data.country_list || [],
        fetchMember: action.data.data.member_level_list || [],
        fetchRefund: action.data.data.refund_method_list || [],
        load: false,
      });
    default:
      return state;
  }
};
export default reducer;

