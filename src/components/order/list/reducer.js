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
      { c: 'cc', d: 'dd' },
      { c: 'ee', d: 'ff' },
      { c: 'ee', d: 'ff' },
    ],
  }],
  fetchType: [],
  fetchWarehouse: [],
  queryString: {
    pageSize: 10,
    pageNumber: 1,
    warehouseId: null,
    categoryFirst: null,
    paytimeStart: moment(Date.now()).subtract(7, 'd').format('YYYY-MM-DD HH:mm:SS'),
    paytimeEnd: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD HH:mm:SS'),
    goodsSn: '',
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
    case TYPES.INIT_TYPE:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_TYPE_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_TYPE_SUCCESS:
      return assign({}, state, {
        fetchType: action.data,
        load: false,
      });
    case TYPES.INIT_WAREHOUSE:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_WAREHOUSE_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_WAREHOUSE_SUCCESS:
      return assign({}, state, {
        fetchWarehouse: action.data,
        load: false,
      });
    case TYPES.EXPORT:
      return assign({}, state, {
        load: true,
      });
    case TYPES.EXPORT_FAIL:
    case TYPES.EXPORT_SUCCESS:
      return assign({}, state, {
        load: false,
      });
    default:
      return state;
  }
};

export default reducer;

