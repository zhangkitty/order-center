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
  queryString: {
    pageSize: 10,
    pageNumber: 1,
    billno: null,    // 订单号
    orderId: null,   // 订单ID
    email: null,    //
    shippingNo: null,  // 发货号
    referenceNumber: null,    // 包裹号
    telephone: null,    // 手机号
    paytimeStart: moment(Date.now()).subtract(7, 'd').format('YYYY-MM-DD'),   // 付款时间
    paytimeEnd: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD'),          // 付款时间
    siteFrom: null,   // 站点
    countryName: null,   // 国家
    txnId: null,   // 付款流水号
    paymentMethod: null,   // 支付方式
    troubleType: null,   // 问题件类型-选中后显示标记人
    remarkUser: null,   // 标记人
    totalSelect: null,   // 美金金额比较符
    totalInput: null,   // 美金金额
  },
  searchLoad: false,
  load: false,
  loadUpdata: false,
  total: 0,
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
        searchType: 0,
      });
    case TYPES.SEARCH_FAIL:
      return assign({}, state, {
        searchLoad: false,
      });
    case TYPES.SEARCH_SUCCESS:
      return assign({}, state, {
        // dataSource: action.data.data.map((v, i) => assign({}, v, { key: i })),
        dataSource: action.data.data.refund_bill_list,
        total: action.data.data.total_refund_bill_number,
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
        fetchType: action.data.data.refund_bill_type_list,
        fetchStatus: action.data.data.refund_bill_status_list,
        fetchPath: action.data.data.refund_path_list,
        fetchPathStatus: action.data.data.refund_path_status_list,
        fetchSite: action.data.data.site_list,
        fetchCountry: action.data.data.country_list,
        fetchMember: action.data.data.member_level_list,
        load: false,
      });
    default:
      return state;
  }
};
export default reducer;

