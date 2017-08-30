/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import moment from 'moment';
import * as TYPES from './types';


const defaultState = {
  dataSource: [{
    order_id: 1,
    billno: 'PKC11549',
    goods_quantity: 2,   // 商品总数(不包含换货商品数)
    check: false,
    goods: [
    { c: 'cc', d: 'dd' },
    { c: 'ee', d: 'ff' },
    ],
  }, {
    order_id: 2,
    billno: 'PKC11548',
    goods_quantity: 3,
    check: false,
    goods: [
      { c: 'cc1', d: 'dd1' },
      { c: 'ee1', d: 'ff1' },
      { c: 'ee2', d: 'ff3' },
    ],
  }],
  fetchCountry: [],    // 国家
  fetchSite: [],  // 站点
  fetchPayment: [],    // 支付方式
  fetchTrouble: [],  // 问题件
  queryString: {
    pageSize: 10,
    pageNumber: 1,
    billno: null,    // 订单号
    orderId: null,   // 订单ID
    email: null,    //
    shippingNo: null,  // 发货号
    referenceNumber: null,    // 包裹号
    telephone: null,    // 手机号
    paytimeStart: moment(Date.now()).subtract(7, 'd').format('YYYY-MM-DD HH:mm:SS'),   // 付款时间
    paytimeEnd: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD HH:mm:SS'),          // 付款时间
    siteFrom: null,   // 站点
    countryName: null,   // 国家
    xnId: null,   // 付款流水号
    paymentMethod: null,   // 支付方式
    troubleType: null,   // 问题件类型
    remarkser: null,   // 标记人
    totalSelect: null,   // 美金金额比较符
    totalInput: null,   // 美金金额
    searchType: null,   // 搜索类型
  },
  clickVisible: false,
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
        load: true,
      });
    case TYPES.SEARCH_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.SEARCH_SUCCESS:
      return assign({}, state, {
        dataSource: action.data.rows.map((v, i) => assign({}, v, { key: i })),
        total: action.data.total,
        load: false,
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
        fetchCountry: action.data.data,
        load: false,
      });
    case TYPES.INIT_SITE:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_SITE_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_SITE_SUCCESS:
      return assign({}, state, {
        fetchSite: action.data.data,
        load: false,
      });
    case TYPES.INIT_PAYMENT:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_PAYMENT_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_PAYMENT_SUCCESS:
      return assign({}, state, {
        fetchPayment: action.data.data,
        load: false,
      });
    case TYPES.INIT_TROUBLE:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_TROUBLE_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_TROUBLE_SUCCESS:
      return assign({}, state, {
        fetchTrouble: action.data.data,
        load: false,
      });
    default:
      return state;
  }
};

export default reducer;

