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
  queryString: {
    pageSize: 10,
    pageNumber: 1,
    billno: null,
    orderId: null,
    shippingNo: null,
    referenceNumber: null,
    telephone: null,
    email: null,
    paytimeStart: moment(Date.now()).subtract(7, 'd').format('YYYY-MM-DD HH:mm:SS'),
    paytimeEnd: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD HH:mm:SS'),
    countryName: '',
    siteFrom: '',
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
    default:
      return state;
  }
};

export default reducer;

